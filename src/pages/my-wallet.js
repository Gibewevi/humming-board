import Layout from "@/components/layout"
import Wallet from "@/components/mywallet/Wallet"

export default function MyWallet(){
    return(
        <div className='min-h-screen'>
        <Layout />
        <div className="max-w-7xl h-[400px] mx-auto p-10">
            <h1 className="font-bold text-2xl">My wallet</h1>
            <Wallet />
        </div>
      </div>
    )
}