import { useContext, useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";

import { PesquisadorProps, columns } from "./columns";

import { DataTable } from "./data-table";
import { ScrollArea } from "../ui/scroll-area";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { UsersFour } from "phosphor-react";

export function TableResearcherViewDashboard() {
  const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);

  const { urlGeralAdm, user } = useContext(UserContext);

  const urlGetResearcher =
    urlGeralAdm + `ResearcherRest/Query?institution_id=${user.institution_id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlGetResearcher, {
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
          setResearcher(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlGetResearcher]);


  return (
    <div className="w-full overflow-y-auto">
        <HeaderResultTypeHome title="Docentes cadastrados" icon={<UsersFour size={24} className="text-gray-400" />}>
                      
                        </HeaderResultTypeHome>
   
      <ScrollArea>
      <div className="  ">
          <DataTable columns={columns} data={researcher} />
        </div>
      </ScrollArea>
    
    </div>
  );
}
