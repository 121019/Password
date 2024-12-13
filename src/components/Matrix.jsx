import React, { useEffect, useRef, useState } from "react";
import gsap from "https://cdn.skypack.dev/gsap@3.11.0";
import "./Matrix.css";

const Matrix = () => {
  const canvasRef = useRef(null);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  const generatePassword = () => {
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?";
    let characters = lowerCaseChars;

    if (includeUppercase) characters += upperCaseChars;
    if (includeNumbers) characters += numbers;
    if (includeSpecialChars) characters += specialChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => alert("Mot de passe copié dans le presse-papiers!"),
      (err) => alert("Erreur lors de la copie : ", err)
    );
  };

  useEffect(() => {
    const CANVAS = canvasRef.current;
    if (!CANVAS) return;

    const DigitalRain = function (el, options) {
      if (el.tagName !== "CANVAS") return console.error("Need a canvas element");
      const self = this;
      self.__ratio = window.devicePixelRatio || 1;
      self.canvas = el;
      self.options = options;
      self.size = options.size;
      self.glyphs = self.options.glyphs.split("");
      self.context = el.getContext("2d");
      self.setSize();
      self.setTracker();
      self.init();
      return self;
    };

    DigitalRain.prototype.setColumn = function (column = {}) {
      const self = this;
      const len = gsap.utils.random(6, self.rows, 1);
      const destination = gsap.utils.random(self.rows * 0.1, self.rows + len, 1);
      const tailEnd = destination + len;
      let chars = column.chars || [];
      let cacheChars = [...chars];

      chars = new Array(Math.max(destination, chars.length)).fill().map((_, index) => {
        return index <= destination
          ? self.glyphs[gsap.utils.random(0, self.glyphs.length - 1, 1)]
          : cacheChars[index];
      });

      const row = gsap.utils.random(-self.rows, -1, 1);
      return {
        chars,
        cacheChars,
        destination,
        tailEnd,
        tailCounter: destination,
        row,
        len,
      };
    };

    DigitalRain.prototype.setTracker = function () {
      this.tracker = new Array(this.columns).fill().map(() => this.setColumn());
    };

    DigitalRain.prototype.reset = function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.setSize();
      this.setTracker();
    };

    DigitalRain.prototype.init = function () {
      const self = this;
      self.renderMatrix = () => self.render();
      window.addEventListener("resize", () => self.reset());
      requestAnimationFrame(self.renderMatrix); // Utilisation manuelle de requestAnimationFrame
    };

    DigitalRain.prototype.render = function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.tracker.forEach((column, x) => {
        if (Math.random() > 0.1) column.row += 1;
        column.chars.forEach((char, y) => {
          const alpha = Math.random() * 0.8 + 0.2;
          this.context.fillStyle = `rgba(0, 255, 0, ${alpha})`;
          if (char) this.context.fillText(char, x * this.fontSize, y * this.fontSize);
        });
        if (column.row > column.destination) this.tracker[x] = this.setColumn();
      });
      
      // Appel à requestAnimationFrame seulement à la fin de chaque cycle de rendu
      requestAnimationFrame(this.renderMatrix);
    };

    DigitalRain.prototype.setSize = function () {
      const { height, width } = this.canvas.getBoundingClientRect();
      // Limiter la taille du canvas pour éviter qu'il devienne trop grand
      this.canvas.height = Math.min(height * this.__ratio, 800); // Taille maximale
      this.canvas.width = Math.min(width * this.__ratio, 1200);  // Taille maximale
      this.fontSize = Math.ceil(this.options.size());
      this.columns = Math.ceil(this.canvas.width / this.fontSize);
      this.rows = Math.ceil(this.canvas.height / this.fontSize);
      this.context.font = `${this.fontSize}px monospace`;
    };

    new DigitalRain(CANVAS, {
      size: () => window.innerWidth * 0.015,
      fps: 15,  // Réduction du nombre de FPS
      glyphs: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    });
  }, []);

  return (
    <div className="matrix-container">
      <canvas ref={canvasRef} className="matrix-canvas"></canvas>
      <div className="password-generator">
        <h2 className="generator-title">Générateur de mots de passe</h2>
        <div className="generator-options">
          <label>
            Longueur du mot de passe:
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min="6"
              max="20"
            />
          </label>
          <div className="checkbox-group">
        <label>
          Inclure des majuscules
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="input-checkbox"
          />
        </label>
        <label>
          Inclure des chiffres
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="input-checkbox"
          />
        </label>
        <label>
          Inclure des caractères spéciaux
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={(e) => setIncludeSpecialChars(e.target.checked)}
            className="input-checkbox"
          />
        </label>
      </div>
    </div>
        <button className="btn-generate" onClick={generatePassword}>
          Générer le mot de passe
        </button>
        <div className="password-display">
          <input type="text" value={password} readOnly />
          <button className="btn-copy" onClick={copyToClipboard}>
            Copier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matrix;
