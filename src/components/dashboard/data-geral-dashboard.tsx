import { useContext, useMemo, useState } from "react";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { ItemHome } from "../homepage/item-home";
import { User } from "lucide-react";
import { ItemDashboard } from "./item-home";
import { GraduationCap } from "phosphor-react";
import { Badge } from "../ui/badge";

interface VisaoPrograma {
    count_gp: string,
    count_gpr: string,
    institution_id: string,
    count_r:string
  }

export function DataGeralDashboard() {
    const { user, urlGeralAdm } = useContext(UserContext);
    const [VisaoPrograma, setVisaoPrograma] = useState<VisaoPrograma[]>([]); 

    let urlVisaoPrograma = `${urlGeralAdm}/InstitutionRest/Query/Count?institution_id=${user.institution_id}`;
    useMemo(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(urlVisaoPrograma, {
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Max-Age": "3600",
              "Content-Type": "text/plain",
            },
          });
          const data = await response.json();
          if (data) {
            setVisaoPrograma(data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [urlVisaoPrograma]);

    console.log(urlVisaoPrograma)

    

    return  (
        <div className="  w-full  flex gap-6 items-center h-[200px]  max-md:flex-col max-md:items-start  max-md:p-4">
             <div className="flex gap-2 items-center ">
          <div>
           
          <h1 className=" text-3xl  font-medium max-w-[290px] ">
            Módulo <strong className="bg-red-700 font-medium text-white"> administrativo </strong>{" "}
        </h1>
        <p className="mt-2 max-w-[290px] text-gray-500 dark:text-gray-300">Cadastre, edite e remova docentes e programa de pós-graduações no módulo administrativo</p>
          </div>
      
           </div>
           
           {VisaoPrograma.map(props => {
            if(String(user.institution_id) == String(props.institution_id)) {
                return(
                    <div className="grid grid-cols-2 gap-6 min-h-full h-full w-full flex-1 max-md:hidden">
                    <ItemDashboard
                title="Docentes"
                url=""
                value={String(props.count_r)}
                ><User size={16} className="" /> </ItemDashboard>

                <ItemDashboard
                title="Pós-graduação"
                url=""
                value={String(props.count_gp)}
                ><GraduationCap size={16} className="" /> </ItemDashboard>
                </div>
                )
            }
            
            })}
           
        </div>
    )
}