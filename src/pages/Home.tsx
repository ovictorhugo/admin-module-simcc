
import { useContext, useEffect } from "react";
import SearchLayout from "../layout/search-layout";
import { UserContext } from "../context/context";
import { GeralProvider } from "../components/provider/geral-provider";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";
import { useLocation, useParams } from "react-router-dom";
import { useModal } from "../components/hooks/use-modal-store";

export function Home() {
    const { onOpen } = useModalHomepage();
    const {setIdGraduateProgram, idGraduateProgram} = useContext(UserContext)

    const location = useLocation();

    const {  programId } = useParams<{
        programId:string
      }>();

      if (programId) {
        setIdGraduateProgram(programId)
      } else {
        setIdGraduateProgram('0')
      }


    useEffect(() => {
         if(location.pathname == '/') {
            onOpen('initial-home')
        } else  if(location.pathname == '/pos-graduacao') {
          onOpen('graduation-home')
      }else  if(location.pathname == `/pos-graduacao/${idGraduateProgram}`) {
        onOpen('graduation-home')
    } 
    }, [location]);
  
console.log(idGraduateProgram)
    return(
        <>
        <SearchLayout>
            <GeralProvider/>

        </SearchLayout>
        </>
    )
}