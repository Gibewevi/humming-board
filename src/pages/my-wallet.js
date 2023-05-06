import Wallet from "@/components/mywallet/Wallet"
import Dashboard from "@/containers/Dashboard"
import DoughnutAssets from "@/components/mywallet/DoughnutAssets"
import { useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect } from "react";
export default function MyWallet(){
    const [wallet, setWallet] = useState([]);
    const { account } = useContext(AuthContext);

    useEffect(() => {
        if (account.user_id) {
            getAssetsByUserId(account.user_id);
        }
    }, [account.user_id]);

    
    const getAssetsByUserId = async (user_id) => {
        if (user_id) {
            const res = await fetch(`/api/wallet?user_id=${user_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const wallet = await res.json();
            setWallet(wallet);
        }
    }


    return(
    <Dashboard>
        <DoughnutAssets assets={wallet}/>
        <Wallet assets={wallet}/>
    </Dashboard>
    )
}