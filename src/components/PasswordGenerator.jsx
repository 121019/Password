/*import React, { useState } from "react";
import './PasswordGenerator';

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12); // Longueur par défaut du mot de passe
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  // Fonction pour générer le mot de passe
  const generatePassword = () => {
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?";

    // Crée un ensemble de caractères à utiliser en fonction des options
    let characters = lowerCaseChars;
    if (includeUppercase) characters += upperCaseChars;
    if (includeNumbers) characters += numbers;
    if (includeSpecialChars) characters += specialChars;

    // Génère le mot de passe
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  // Fonction pour copier le mot de passe dans le presse-papiers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => alert("Mot de passe copié dans le presse-papiers!"),
      (err) => alert("Erreur lors de la copie : ", err)
    );
  };

  return (
    <div className="password-generator">
      <h2>Générateur de mot de passe</h2>
      <div className="options">
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
        <label>
          Inclure des majuscules
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
        </label>
        <label>
          Inclure des chiffres
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </label>
        <label>
          Inclure des caractères spéciaux
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={(e) => setIncludeSpecialChars(e.target.checked)}
          />
        </label>
      </div>
      <button onClick={generatePassword}>Générer le mot de passe</button>
      <div className="password-display">
        <input type="text" value={password} readOnly />
        <button onClick={copyToClipboard}>Copier</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;*/
