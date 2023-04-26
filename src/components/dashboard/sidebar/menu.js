export default function Menu(props){

    return(
        <li className="flex flex-row items-center gap-x-3 hover:bg-[#dc1f30]"><img src={props.image} className="w-[20px]"/>{props.title}</li>
    )
}