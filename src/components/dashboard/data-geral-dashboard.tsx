import { useContext } from "react";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";

export function DataGeralDashboard() {
    const { user } = useContext(UserContext);

    return  (
        <div className="flex gap-6 w-full h-fit items-center ">
             <div className="flex gap-2 items-center">
           <h1 className=" text-3xl  font-medium max-w-[400px] ">
            Bem vindo(a) ao Módulo <strong className="bg-red-700 text-white"> administrativo </strong>{" "}
        </h1>
        <img src={user.img_url} alt="" className="h-20" />
           </div>

           <div className="grid grid-cols-2 gap-6 w-full flex-1">
            <Alert className="flex flex-col items-end justify-center">
            <p className="">Total de docentes</p>
                <h3 className="text-6xl font-medium"></h3>
            </Alert>

            <Alert className="flex flex-col items-end justify-center">
            <p className="">Total de pós-graduação</p>
                <h3 className="text-6xl font-medium"></h3>
            </Alert>
           </div>
        </div>
    )
}