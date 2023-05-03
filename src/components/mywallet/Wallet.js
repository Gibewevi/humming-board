import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthProvider";

import Asset from "./Asset";

export default function Wallet(props) {


return (
    <div className="grow h-fit flex flex-col gap-y-2 shadow-lg bg-[#1A1D1F] p-10">
        <h2 className="font-bold text-2xl">My wallet</h2>
        <div className="flex flex-row w-full text-lg mt-5">
            <div className="w-full">
                <p>asset</p>
            </div>
            <div className="w-full">
                <p>start amount</p>
            </div>
            <div className="w-full">
                <p>current amount</p>
            </div>
            <div className="w-full">
                <p>P&L</p>
            </div>
            <div className="w-full">
                <p>P&L%</p>
            </div>
        </div>
        {props.assets.map((asset, key) => (
            <Asset key={key} asset={asset} />
        ))}
    </div>
)
}