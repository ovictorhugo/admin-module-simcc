
import { useContext, useEffect } from "react";
import SearchLayout from "../layout/search-layout";
import { UserContext } from "../context/context";
import { GeralProvider } from "../components/provider/geral-provider";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";
import { useLocation, useParams } from "react-router-dom";


export function PosGraduation() {
    const { onOpen } = useModalHomepage();
    const {setIdGraduateProgram,isCollapsed} = useContext(UserContext)

    const location = useLocation();

    const {  programId,  } = useParams<{
        programId:string
      }>();

      if (programId) {
        setIdGraduateProgram(programId)
      } else {
        setIdGraduateProgram('0')
      }


    useEffect(() => {
        if(location.pathname == '/pos-graduacao') {
            onOpen('graduation-home')
        } else if(location.pathname == `/pos-graduacao/${programId}`) {
            onOpen('graduation-home')
        } 
    }, [location]);
  

    return(
        <>
        <SearchLayout
         defaultLayout={[1,2]}
         defaultCollapsed={isCollapsed}
         navCollapsedSize={4}
        >
            <GeralProvider/>

        </SearchLayout>
        </>
    )
}