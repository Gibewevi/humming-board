import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthProvider";

export default function Wallet() {
    const [assets, setAssets] = useState([]);
    const { account } = useContext(AuthContext);

    const Assets = () => {
        if (assets) {
            // return assets.map((asset, key) => {
            //     console.log(asset);
            //     return (
            //         <tr key={key}>
            //             <td>{asset.asset}</td>
            //             <td>2.5%</td>
            //             <td>356.26$</td>
            //         </tr>
            //     )
            // })
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
        <table className="table-fixed w-full text-left border-separate border-spacing-2 border border-red-500 ">
            <thead>
                <tr className="">
                    <th className="border border-cyan-400">asset</th>
                    <th className="border border-cyan-400">start</th>
                    <th className="border border-cyan-400">current</th>
                    <th className="border border-cyan-400">P&L%</th>
                    <th className="border border-cyan-400">P&L$</th>
                </tr>
            </thead>
            <tbody>
                <Assets />
            </tbody>
        </table>
    )
}