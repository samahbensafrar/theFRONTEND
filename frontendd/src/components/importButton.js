import React, { useRef } from "react";
import axios from "axios";

const ImportButton = () => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // Ouvre la boîte de dialogue de fichiers
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/import-clients/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Importation réussie !");
      console.log("Réponse :", response.data);
    } catch (error) {
      alert("Erreur lors de l'importation.");
      console.error("Erreur :", error);
    }
  };

  return (
    <div>
      <button className="import-button" onClick={handleClick}>
        Importer
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".csv"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImportButton;

