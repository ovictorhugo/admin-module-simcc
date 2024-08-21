import { useContext } from "react";
import { Badge } from "../ui/badge";
import { UserContext } from "../../context/context";

export function HomeDashboard() {

    const {role} = useContext(UserContext)
    return(
        <main className="w-full md:p-8 p-4">
            <div className=" bg-[rgb(113,156,184)] rounded-md w-full h-[40vh]  text-white p-8 flex items-end">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">Módulo administrativo</h1>
                            <Badge>{role}</Badge>
                        </div>
                        <p className="max-w-[750px] mt-2 text-lg font-light text-foreground"></p>
                    </div>
            </div>
        </main>
    )
}