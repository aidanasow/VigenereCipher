import React, { useState } from "react";
import "./VigenereCipher.css";

const VigenereCipher = () => {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [mode, setMode] = useState("encrypt");
    const [alphabet, setAlphabet] = useState("english");
    const [result, setResult] = useState("");

    const processText = () => {
        if (!text || !key) {
            alert("Введите текст и ключ!");
            return;
        }

        const isEnglish = alphabet === "english";
        const alphabetStart = isEnglish ? 97 : 1072;
        const alphabetEnd = isEnglish ? 122 : 1103;
        const alphabetLength = isEnglish ? 26 : 32;

        const isEncrypt = mode === "encrypt";
        const keyLower = key.toLowerCase();
        const textLower = text.toLowerCase();
        let processedText = "";

        for (let i = 0, j = 0; i < textLower.length; i++) {
            const charCode = textLower.charCodeAt(i);

            if (charCode >= alphabetStart && charCode <= alphabetEnd) {
                const shift = keyLower.charCodeAt(j % keyLower.length) - alphabetStart;
                const newCharCode = isEncrypt
                    ? ((charCode - alphabetStart + shift) % alphabetLength) + alphabetStart
                    : ((charCode - alphabetStart - shift + alphabetLength) % alphabetLength) + alphabetStart;

                processedText += String.fromCharCode(newCharCode);
                j++;
            } else {
                processedText += textLower[i];
            }
        }

        setResult(processedText);
    };

    return (
        <div className="cipher-container">
            <h1 className="cipher-title">Шифр Виженера</h1>
            <textarea
                className="cipher-textarea"
                placeholder="Введите текст"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                className="cipher-input"
                type="text"
                placeholder="Введите ключ"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />
            <div className="cipher-options">
                <div className="cipher-alphabet">
                    <label>
                        <input
                            type="radio"
                            value="english"
                            checked={alphabet === "english"}
                            onChange={() => setAlphabet("english")}
                        />
                        Английский
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="russian"
                            checked={alphabet === "russian"}
                            onChange={() => setAlphabet("russian")}
                        />
                        Русский
                    </label>
                </div>
                <div className="cipher-mode">
                    <label>
                        <input
                            type="radio"
                            value="encrypt"
                            checked={mode === "encrypt"}
                            onChange={() => setMode("encrypt")}
                        />
                        Шифрование
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="decrypt"
                            checked={mode === "decrypt"}
                            onChange={() => setMode("decrypt")}
                        />
                        Дешифрование
                    </label>
                </div>
            </div>
            <button className="cipher-button" onClick={processText}>
                Обработать
            </button>
            <h2 className="cipher-result-title">Результат:</h2>
            <textarea className="cipher-result" readOnly value={result} />
        </div>
    );
};

export default VigenereCipher;
