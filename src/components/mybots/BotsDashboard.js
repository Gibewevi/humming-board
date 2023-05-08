import Bots from "@/components/mybots/bots"
import UploadFile from "@/components/mybots/UploadFile"
import { useState } from "react"

export default function BotsDashboard(props) {

    const [newBot, setNewBot] = useState(false);

    const handleNewBot = () => {
        setNewBot(!newBot);
    }

    return (
        <div className="mx-auto grow p-10">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="font-bold text-2xl">My bots</h2>

                    <div className="flex flex-row justify-center items-center">
                        {
                            newBot ?
                                <UploadFile /> : <></>
                        }

                        <button onClick={handleNewBot} className="flex flex-row items-center justify-center gap-x-2 rounded-md text-slate-200 p-2 h-[35px] font-black transition duration-200 ease-in border border-1 border-slate-200 fill-white hover:fill-black hover:bg-white hover:text-slate-900">New bot
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="w-[22px]">
                                <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16S9.4 4 16 4m0-2C8.3 2 2 8.3 2 16s6.3 14 14 14s14-6.3 14-14S23.7 2 16 2z" />
                                <path d="M24 15h-7V8h-2v7H8v2h7v7h2v-7h7z" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
            <div className="">
                <Bots bots={props.bots}/>
            </div>
        </div>
    )
};