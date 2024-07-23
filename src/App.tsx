import React, { useState } from "react";
import { convertText } from "./utils";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setOutputText(convertText(newText));
  };

  const handleCopy = async () => {
    setIsLoading(true);
    try {
      await navigator.clipboard.writeText(outputText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter your text here"
          />
        </div>
        <div className="output-container">
          <pre>{outputText}</pre>
          <button onClick={handleCopy} disabled={isLoading}>
            {isLoading ? "Copying..." : copySuccess ? "Copied!" : "Copy"}
          </button>
          {copySuccess && (
            <span className="success-message">Text copied to clipboard!</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
