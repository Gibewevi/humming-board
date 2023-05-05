import { useEffect, useState } from "react"

export default function Asset(props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleBotsDetails = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    const isPair = (number) => {
        if (number % 2 === 0) {
            return true;
        }
        return false;
    }

    const asset = props.asset;
    return (
        <>
            <div className="flex flex-col gap-y-3 mt-3">
                <div className="flex flex-row list-none bg-[#111315] text-[#535557] p-1 font-black">
                    <li className="flex flex-row w-full">
                        <img src='CarbonCaretRight.svg' className={`${isOpen ? 'rotate-90' : 'rotate-0'} transition duration-150 ease-in w-[20px]`} onClick={handleBotsDetails} />
                        {asset.pair}
                    </li>
                    <li className="w-full">{asset.start_amount}</li>
                    <li className="w-full">{asset.current_amount}</li>
                    <li className={`${asset.PNL > 0 ? 'text-green-400' : 'text-red-400'} w-full`}>{asset.PNL}</li>
                    <li className={`${asset.PNLPercent > 0 ? 'text-green-400' : 'text-red-400'} w-full`}>{asset.PNLPercent}%</li>
                </div>
                {isOpen &&
                    <div className="flex flex-col gap-y-3">
                        {asset.bots.map((bot, key) => {
                            return (
                                <div className={`${isPair(key) ? '' : ''} flex flex-row list-none text-sm text-[#4F4F4F] p-1 hover:bg-[#151719] hover:text-white `}>
                                    <li className="w-full flex flex-row">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" className="fill-[#4F4F4F] hover:fill-white">
                                            <path className="" d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25Z" />
                                            <path className=" " d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6Zm0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4Z" />
                                        </svg>

                                        <span className="ml-5">bot:{bot.id}</span></li>
                                    <li className="w-full">{bot.amount}</li>
                                    <li className="w-full">{bot.currentAmount}</li>
                                    <li className={`${bot.PNL > 0 ? 'text-green-400' : 'text-red-400'} w-full`}>{bot.PNL}</li>
                                    <li className={`${bot.PNLPercent > 0 ? 'text-green-400' : 'text-red-400'} w-full`}>{bot.PNLPercent}%</li>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </>
    )
}