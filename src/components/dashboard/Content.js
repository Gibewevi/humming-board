import BotsPanel from "@/containers/BotsPannel"
export default function Content(){
    return(
        <div className="w-full">
            <p className="text-xl">App Dashboard</p>
            {/* Page a afficher */}
            <BotsPanel />
        </div>  
    )
}