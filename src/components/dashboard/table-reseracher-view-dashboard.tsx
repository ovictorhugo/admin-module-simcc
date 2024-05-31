import { useContext, useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";

import { PesquisadorProps, columns } from "./columns";

import { DataTable } from "./data-table";
import { ScrollArea } from "../ui/scroll-area";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { UsersFour } from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { ConfirmDeleteResearcher } from "../modals/confirm-delete-researcher";
import { Skeleton } from "../ui/skeleton";

export function TableResearcherViewDashboard() {
  const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);

  const { urlGeralAdm, user } = useContext(UserContext);
  const {type, isOpen, onClose} = useModal()
  const [isLoading, setIsLoading] = useState(true)

  const aa = type == 'confirm-delete-researcher'

  const bb = !isOpen

  const urlGetResearcher =
    urlGeralAdm + `ResearcherRest/Query?institution_id=${user.institution_id}`;

    useEffect(() => {
      
      const fetchData = async () => {
        try {
          const response = await fetch(urlGetResearcher, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Max-Age': '3600',
              'Content-Type': 'text/plain',
            },
          });
          const data = await response.json();
          if (data) {
            setResearcher(data);
            setIsLoading(false)
          }
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData(); // Initial fetch
  
      const intervalId = setInterval(fetchData, 2000); // Fetch every 5 seconds
  
      return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [urlGetResearcher]);

  return (
    <div className="w-full overflow-y-auto">
       <Alert className="mb-4 flex items-center justify-between">
        <div className="flex gap-6 items-center">
        
        </div>

        <div className="flex items-end flex-col">
          <p className="text-3xl font-bold">{researcher.length}</p> <p>Docentes</p>
        </div>
      </Alert>

        <HeaderResultTypeHome title="Docentes cadastrados" icon={<UsersFour size={24} className="text-gray-400" />}>
                      
                        </HeaderResultTypeHome>
   
      {isLoading ? (
        <div>
          <Skeleton className="w-full h-[600px] rounded-md mt-6"/>
        </div>
      ):(
        <ScrollArea>
        <div className="  ">
            <DataTable columns={columns} data={researcher} />
          </div>
        </ScrollArea>
      )}

      <ConfirmDeleteResearcher/>
    
    </div>
  );
}
