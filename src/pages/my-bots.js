import Layout from "@/components/layout"
import Bots from "@/components/mybots/bots"
import UploadFile from "@/components/mybots/UploadFile";
import { useState } from "react";

export default function MyBots() {
    const [newBot, setNewBot] = useState(false);

    const handleNewBot = () => {
        setNewBot(!newBot);
        console.log(newBot);
    }

    return (
        <div className='min-h-screen'>
            <Layout />
            <div className="max-w-7xl h-[400px] mx-auto p-10">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="font-bold text-2xl">My bots</h2>

                        <div className="flex flex-row justify-center items-center">
                            {
                                newBot ?
                                <UploadFile /> : <></>
                            }
                            
                            <button onClick={handleNewBot} className="flex flex-row items-center justify-center gap-x-2 rounded-md text-slate-200 p-2 h-[35px] font-black border border-1 border-slate-200">New bot
                                <img src='/CarbonAddAlt.svg' className="w-[22px]" />
                            </button>
                        </div>

                    </div>
                </div>
                <div className="">
                    <Bots />
                </div>
            </div>
        </div>
    )
}