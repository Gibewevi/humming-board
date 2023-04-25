import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState();
  const [bots, setBots] = useState();

  const ListBots = () => {
    if (bots) {
      return bots.map((bot, key) => {
        return (
            <div className=' bg-white text-slate-800 p-3 rounded-lg'>
              <h2 className='font-bold text-lg'>{bot.id}</h2>
              <div className='flex flex-row justify-between'>
                <p>{bot.strategy}</p>
                <p>{bot.symbol}</p>
              </div>
            </div>
        )
      })
    }
  }




  const handleGetBots = async () => {
    const res = await fetch(`/api/bots?user_id=${1}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setBots(data.bots);
  }
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
      <div className='max-w-xl mx-auto flex flex-col gap-y-8'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-5 bg-white text-slate-800 p-3 mt-[400px]'>
          <input type='file' accept='.csv' onChange={handleFileChange} />
          <button className='border border-1 border-slate-400 bg-slate-800 text-white p-2'>importer</button>
        </form>
        <div className='flex flex-col bg-white text-slate-800 p-3'>
          <p>Listes des bots</p>
          <button onClick={handleGetBots} className='border border-1 border-slate-400 bg-slate-800 text-white p-2' >getBotsUser_id</button>
        </div>
        <ListBots />
      </div>

    </>
  );
};

export default Home;
