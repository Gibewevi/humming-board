import Menu from "./menu"
import Link from "next/link"
export default function Sidebar(){
    return(
        <div className="absolute inset-y-0 mt-[50px] w-[250px] bg-[#131213] p-5">
            <div className="list-none flex flex-col gap-y-2 justify-center mt-6">
                <Menu title='Mes performances' image='/CarbonAnalytics.svg' link='/my-performance'/>
                <Menu title='Mes bots' image='/CarbonBot.svg' link='my-bots'/>
                <Menu title='Wallet' image='/CarbonAccount.svg' link='my-wallet'/>
                <Menu title='Log out' image='/CarbonExit.svg' link='logout'/>
            </div>
        </div>
    )
}