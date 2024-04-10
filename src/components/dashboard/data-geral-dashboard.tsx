import { useContext, useMemo, useState } from "react";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { ItemHome } from "../homepage/item-home";
import { User } from "lucide-react";
import { ItemDashboard } from "./item-home";
import { GraduationCap } from "phosphor-react";

interface VisaoPrograma {
    count_gp: string,
    count_gpr: string,
    institution_id: string
  }

export function DataGeralDashboard() {
    const { user, urlGeralAdm } = useContext(UserContext);
    const [VisaoPrograma, setVisaoPrograma] = useState<VisaoPrograma[]>([]); 

    let urlVisaoPrograma = `${urlGeralAdm}/InstitutionRest/Query/Count`;
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
        <div className="flex gap-6 w-full h-fit max-lg:items-center max-xl:flex-col ">
             <div className="flex gap-2 items-center">
           <h1 className=" text-3xl  font-medium max-w-[380px] ">
            Bem vindo(a) ao Módulo <strong className="bg-red-700 text-white"> administrativo </strong>{" "}
        </h1>
        <img src={user.img_url} alt="" className="h-20" />
           </div>

           
           {VisaoPrograma.map(props => {
            if(String(user.institution_id) == String(props.institution_id)) {
                return(
                    <div className="grid grid-cols-2 gap-6 h-full w-full flex-1">
                    <ItemDashboard
                title="Docentes"
                url=""
                value={String(props.count_gpr)}
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