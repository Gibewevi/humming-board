import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthProvider";

export default function Wallet() {
    const [assets, setAssets] = useState([]);
    const { account } = useContext(AuthContext);

    const Assets = () => {
        if (assets) {
            return assets.map((asset, key) => {
                return (
                    <div className="flex flex-col gap-y-3 mt-3">

                        <div className="flex flex-row text-md">
                            <div className="w-full flex flex-row items-center">
                                <img src='/CarbonCaretRight.svg' className="w-[20px]" />
                                {asset.pair}
                            </div>
                            <div className="w-full">{asset.start_amount}</div>
                            <div className="w-full">{asset.current_amount}</div>
                            <div className="w-full text-[#7ED928]">{asset.PNL}</div>
                            <div className="w-full text-[#7ED928]">{asset.PNLPercent}%</div>
                        </div>

                        {asset.bots.map((bot, key) => {
                            return (
                                <div className="flex flex-row text-sm">
                                    <div className="w-full">{bot.id}</div>
                                    <div className="w-full">{bot.amount}</div>
                                    <div className="w-full">{bot.currentAmount}</div>
                                    <div className="w-full text-[#7ED928]">{bot.PNL}</div>
                                    <div className="w-full text-[#7ED928]">{bot.PNLPercent}%</div>
                                </div>
                            )
                        })}
                    </div>
                )
            })
        }
    }

    const getAssetsByUserId = async (user_id) => {
        console.log(getAssetsByUserId)
        if (user_id) {
            const res = await fetch(`/api/wallet?user_id=${user_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const wallet = await res.json();
            setAssets(wallet);
        }
    }

    useEffect(() => {
        if (account.user_id) {
            getAssetsByUserId(account.user_id);
        }
    }, [account.user_id]);


    return (
        <div className="flex flex-col">
            <div className="flex flex-row w-full text-lg">
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
            <Assets />
        </div>
    )
}