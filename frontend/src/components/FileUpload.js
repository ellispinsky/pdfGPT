import React, { useState } from "react";
import axios from "axios";

function FileUpload({ apiKey }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("apiKey", apiKey);

    try {
      const response = await axios.post("http://localhost:3001/api/upload", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


      console.log(response.data);
      alert("File uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to upload file");
    }
  };

  return (
    <div>
      <h1>Upload a PDF</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
