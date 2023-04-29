import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthProvider";

export default function Wallet() {
    const [assets, setAssets] = useState([]);
    const { account } = useContext(AuthContext);

    const Assets = () => {
        if (assets) {
            return assets.map((asset, key) => {
                return (
                    <div key={key} className="flex flex-row justify-between items-center text-lg">
                        <p>{asset.asset}</p>
                        <p>{asset.amount}</p>
                    </div>
                )
            })
        }
    }

    const getAssetsByUserId = async (user_id) => {
        if (user_id) {
            const res = await fetch(`/api/wallet?user_id=${user_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const wallet = await res.json();
            console.log(wallet);
            setAssets(wallet);
        }
    }

    useEffect(() => {
        getAssetsByUserId(account.user_id);
    }, []);

    return (
        <div className="flex flex-col gap-y-5 p-5">
            <Assets />
        </div>
    )
}