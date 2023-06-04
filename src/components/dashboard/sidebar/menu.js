import Link from "next/link"
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export default function Menu(props) {
    const { account } = useContext(AuthContext);

    return (
        <Link href={props.link}>
            <li className="flex flex-row items-center gap-x-3 hover:bg-[#dc1f30] hover:shadow-custom hover:shadow-[#dc1f30]  p-1 hover:rounded-sm overflow-hidden"><img src={props.image} className="w-[22px]" />
            { props.unfold && <span className=" min-w-[250px]">{props.title}</span>}
            </li>
        </Link>
    )
}