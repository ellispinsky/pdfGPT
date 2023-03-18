import React from "react";
import axios from "axios";

function FileUpload({ onPdfUploaded }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("pdf", file);
    await axios.post("/upload", formData);
    onPdfUploaded();
  };

  return (
    <div>
      <h2>Upload a PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;
