import Menu from "./menu"
export default function Sidebar(){
    return(
        <div className="absolute inset-y-0 mt-[50px] w-[250px] bg-[#131213] p-5">
            <div className="list-none flex flex-col gap-y-2 justify-center">
                <Menu title='Mes performances' image='/CarbonAnalytics.svg'/>
                <Menu title='Mes bots' image='/CarbonBot.svg'/>
                <Menu title='Wallet' image='/CarbonAccount.svg'/>
                <Menu title='Log out' image='/CarbonExit.svg'/>
            </div>
        </div>
    )
}