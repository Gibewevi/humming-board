import React, { useState } from 'react';
import Layout from '@/components/layout';

export default function UploadFile() {
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
        <form onSubmit={handleSubmit} className='flex flex-row text-slate-800 w-[350px] mr-3'>
            <input type='file' accept='.csv' onChange={handleFileChange} className='block w-fulltext-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-[#6D28D9]
      hover:file:bg-violet-100'
            />
            <button className=''>
                <img src='CarbonCloudUpload.svg' className="w-[35px]" />
            </button>
        </form>
    );
}