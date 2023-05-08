import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthProvider";
import { Chart } from "chart.js";
import PLchart from "../charts/PLchart";
import Link from "next/link";

export default function Bots(props) {
    const bots = props.bots;
    const { account } = useContext(AuthContext)

    const data = [
        { timestamp: "2022-01-01", profit: 850 },
        { timestamp: "2022-01-02", profit: 150 },
        { timestamp: "2022-01-03", profit: 500 },
        { timestamp: "2022-01-04", profit: 10 },
        { timestamp: "2022-01-05", profit: 950 },
        { timestamp: "2022-01-06", profit: 240 },
        { timestamp: "2022-01-07", profit: 10 },
        { timestamp: "2022-01-02", profit: 2000 },
        { timestamp: "2022-01-03", profit: 90 },
        { timestamp: "2022-01-04", profit: 180 },
        { timestamp: "2022-01-05", profit: 100 },
        { timestamp: "2022-01-06", profit: 1050 },
        { timestamp: "2022-01-07", profit: 290 },
    ];


    const ListBots = () => {
        if (bots && Array.isArray(bots)) { // add a check to see if bots is defined and is an array
            return bots.map((bot, key) => {
                return (
                    <div key={key} data-id={bot.id} className='group relative overflow-hidden flex flex-col gap-y-2 bg-[#1A1D1F] text-slate-400 p-3 rounded-sm mt-5 w-[350px] h-[350px] transition duration-900 ease-out hover:border hover:border-1 hover:border-[#dc1f30] hover:scale-105'>
                        <div>
                            <h2 className='text-white font-bold text-md'>{bot.symbol}</h2>
                            <p className="text-[#535557]">{bot.strategy}</p>
                        </div>
                        <img src='CarbonUserMultiple.svg' className="absolute top-2 right-2 w-[15px]" />
                        <div className=" grow w-full">
                            <PLchart data={data} />
                        </div>
                        <div className="transition duration-200 ease-in absolute bottom-0 w-full h-[70px] bg-gradient-to-r from-red-500 to-pink-500 opacity-70 -ml-3 translate-y-[70px] group-hover:-translate-y-[0px] ">
                            <Link href={`my-bots/${bot.id}`}>
                                <button className="absolute right-0 top-1/2 right-3 transform -translate-y-1/2 flex flex-row items-center justify-center gap-x-2 rounded-md text-slate-200 p-2 h-[35px] font-black transition duration-200 ease-in border border-1 border-slate-200 fill-white hover:fill-black hover:bg-white hover:text-slate-900">consulter {bot.id}</button>
                            </Link>
                        </div>
                    </div>
                )
            })
        } else {
            return null; // return null or a default component if bots is not defined or is not an array
        }
    }


    return (
        <div className="flex flex-wrap grow w-full gap-x-3">
            <ListBots />
        </div>
    )
}
