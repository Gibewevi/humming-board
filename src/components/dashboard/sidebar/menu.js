import Link from "next/link"
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export default function Menu(props) {
    const { account } = useContext(AuthContext);

    return (
        <Link href={props.link}>
            <li className="flex flex-row items-center gap-x-3 hover:bg-[#dc1f30]"><img src={props.image} className="w-[20px]" />{props.title}</li>
        </Link>
    )
}