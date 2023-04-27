import Content from "@/components/dashboard/Content"
import { useState } from "react"

export default function Dashboard() {

    const [page, setPage] = useState();

    return (
        <div className="flex-grow max-w-5xl w-full mx-auto mt-10">
            <Content />
        </div>
    )
}