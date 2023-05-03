import Header from "./header/Header"
export default function Layout() {
    return (
        <>
            <div class="flex flex-col h-screen">
                <div class="flex-shrink-0 h-16 bg-gray-300">Header</div>
                <div class="flex-grow bg-red-400">
                    <div class="flex h-full">
                        <div class="grow h-full w-[250px] bg-[#131213] p-5">
                            <div class="list-none flex flex-col gap-y-2 justify-center mt-6 text-white">
                                <li title='Mes performances' image='/CarbonAnalytics.svg' link='/my-performance' />
                                <li title='Mes bots' image='/CarbonBot.svg' link='my-bots' />
                                <li title='Wallet' image='/CarbonAccount.svg' link='my-wallet' />
                                <li title='Log out' image='/CarbonExit.svg' link='logout' />
                            </div>
                        </div>
                        <div class="w-full"></div>
                    </div>
                </div>
            </div>
        </>
    )
}