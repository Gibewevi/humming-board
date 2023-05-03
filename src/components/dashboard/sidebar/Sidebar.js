import Menu from "./menu"
import Link from "next/link"
export default function Sidebar(){
    return(
        <div className="grow h-full w-[250px] bg-[#1A1D1F] p-5">
            <div className="list-none flex flex-col gap-y-2 justify-center mt-6">
                <Menu title='Mes performances' image='/CarbonAnalytics.svg' link='/my-performance'/>
                <Menu title='Market' image='/CarbonStore.svg' link='market'/>
                <Menu title='Mes bots' image='/CarbonBot.svg' link='my-bots'/>
                <Menu title='Wallet' image='/CarbonAccount.svg' link='my-wallet'/>
                <Menu title='Log out' image='/CarbonExit.svg' link='logout'/>
            </div>
        </div>
    )
}