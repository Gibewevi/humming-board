export default function Header() {
    return (
        <div className="flex flex-row justify-between items-center bg-[#131213] border border-1 border-r-0 border-l-0 border-t-0 border-b-1 border-slate-700 h-[50px] shadow-xl">
            <div className="flex flex-row gap-x-3 ml-8">
                <img src='/bird.png' className="w-[30px] h-[25px]" />
                <h1 className=" font-satoshi text-xl">HummingBoard</h1>
            </div>
            <div className="flex flex-row justify-center items-center gap-x-5 list-none font-light font-satoshi text-md">
                <li >Market bot</li>
                <li >Developers</li>
                <li >Pricing</li>
                <button className="bg-[#dc1f30] p-1 rounded-md mr-8">Metamask</button>
            </div>
        </div>
    )
}