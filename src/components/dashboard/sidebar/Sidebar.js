import Menu from "./menu"
import Link from "next/link"
import { AuthContext } from "@/context/AuthProvider"
import { useContext, useState } from "react"
export default function Sidebar(){
    const {account} = useContext(AuthContext);
    const [unfold, setIsUnfold] = useState(false);

    const unfoldHover = () => {
        setIsUnfold(!unfold);
    }
    
    return(
        <div onMouseLeave={unfoldHover} onMouseEnter={unfoldHover} className={`grow h-full w-[90px] transition-all duration-200 ease-in hover:w-[250px] bg-[#1A1D1F] p-5  transition-all ease-in duration-200 "}`}>
            <div className={`${unfold ? "list-none flex flex-col gap-y-4 justify-center mt-6" : "list-none flex flex-col gap-y-4 justify-center items-center mt-6"}`}>
                <Menu title='Mes performances' image='/CarbonAnalytics.svg' link='/my-performance' unfold={unfold}/>
                <Menu title='Market' image='/CarbonStore.svg' link='market' unfold={unfold}/>
                { account && <Menu title='Mes bots' image='/CarbonBot.svg' link={`my-bots?user_id=${account.user_id}`} unfold={unfold}/>}
                { account && <Menu title='Wallet' image='/CarbonAccount.svg' link={`my-wallet?user_id=${account.user_id}`} unfold={unfold}/>}
                <Menu title='Log out' image='/CarbonExit.svg' link='logout' unfold={unfold}/>
            </div>
        </div>
    )
}