import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthProvider";
import { Chart } from "chart.js";
import PLchart from "../charts/PLchart";

export default function Bots() {
    const [bots, setBots] = useState();
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

    useEffect(() => {
        getBots();
    }, [account])

    async function getBots() {
        if (account) {
            const res = await fetch(`/api/bots?user_id=${account.user_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            setBots(data.bots);
        }
    };

    const ListBots = () => {
        if (bots && Array.isArray(bots)) { // add a check to see if bots is defined and is an array
            return bots.map((bot, key) => {
                return (
                    <div key={key} className='flex flex-col gap-y-2 bg-[#1A1D1F] text-slate-400 p-3 rounded-sm mt-5 h-[300px] relative transition duration-900 ease-out hover:border hover:border-1 hover:border-[#dc1f30]  hover:scale-105'>
                        <div>
                            <h2 className='text-white font-bold text-md'>{bot.symbol}</h2>
                            <p className="text-[#535557]">{bot.strategy}</p>
                        </div>
                        <img src='CarbonUserMultiple.svg' className="absolute top-2 right-2 w-[15px]" />
                        <div className=" grow w-full">
                            <PLchart data={data} />
                        </div>
                    </div>
                )
            })
        } else {
            return null; // return null or a default component if bots is not defined or is not an array
        }
    }


    return (
        <div className="grid grid-cols-5 w-full gap-x-3">
            <ListBots />
        </div>
    )
}