import React, { useEffect, useState } from "react";
import copyIcon from "../assets/paste.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RetrieveSection = () => {
  const [id, setID] = useState("");
  const [error, setError] = useState(null);
  const [retrievedText, setRetrievedText] = useState("");

  const handleIDChange = (e) => {
    setID(e.target.value);
    // console.log(id);
  };

  useEffect(() => {
    // Make a fetch request to your Express.js backend
    fetch('https://cpboard.vercel.app/initial')
      .then(response => response.text())
      .then(data => {
        console.log(data); // Log the response to the console
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const retrieveCopied = async (e) => {
    e.preventDefault();

    if (id.length === 0) {
      setError("Enter a valid ID");
      return;
    }

    try {
      const response = await fetch(`https://cpboard.vercel.app/retrieve?id=${id}`);
      const retrieved = await response.json();

      const retrievedText = retrieved.data.text;
      setRetrievedText(retrievedText);
    } catch (error) {
      setError("Invalid ID");
    }

    // console.log(retrievedText);
  };

  const copyToast = () => {
    toast.success('Copied to Clipboard', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  return (
    <div className="copy-section">
      <form onSubmit={retrieveCopied} className="copy-form">
        <textarea
        spellCheck='false'
        placeholder="Retrieved text will appear here..."
          value={retrievedText}
          onChange={(e) => setRetrievedText(e.target.value)}
          rows={8}
        ></textarea>
        <CopyToClipboard text={retrievedText} onCopy={copyToast}>
          <button type="button" className="copy-btn">
            <img src={copyIcon} alt="copy-icon" className="copyIcon" />
          </button>
        </CopyToClipboard>

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="center-retrieve">
          <input
            value={id}
            onChange={handleIDChange}
            className="id-input"
            placeholder="Enter ID"
          ></input>
          <button type="submit" className="button-0">
            Retrieve from Clipboard
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default RetrieveSection;
