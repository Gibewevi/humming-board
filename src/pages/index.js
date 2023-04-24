import React, { useState, useEffect } from 'react';

const Home = () => {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState();


  // Fonction qui gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileContent = event.target.result;

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: fileContent
      });

      const data = await res.json();
      console.log('data', data);

      // Stocke les données CSV dans l'état du composant
      setCsvData(data.symbols);
    };

    reader.readAsText(file);
  };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='file' accept='.csv' onChange={handleFileChange} />
        <button>importer</button>
      </form>
    </>
  );
};

export default Home;
