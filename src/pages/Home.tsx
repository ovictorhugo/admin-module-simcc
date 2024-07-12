
import { useContext, useEffect, useState } from "react";
import SearchLayout from "../layout/search-layout";
import { UserContext } from "../context/context";
import { GeralProvider } from "../components/provider/geral-provider";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";
import { useLocation, useParams } from "react-router-dom";



export function Home() {
    const { onOpen } = useModalHomepage();
    const {navCollapsedSize, defaultLayout, isCollapsed,setIdGraduateProgram, idGraduateProgram, valoresSelecionadosExport, setValoresSelecionadosExport} = useContext(UserContext)

  

    const location = useLocation();
    const { searchId } = useParams<{
      searchId: string
  }>();

  

  useEffect(() => {
    if (searchId) {
        setValoresSelecionadosExport(searchId);
        console.log('setValoresSelecionadosExport', searchId);
    }
}, [searchId]);

     

    useEffect(() => {
      if(location.pathname == '/') {
      onOpen('initial-home')
  } else  if(location.pathname == `/resultados`) {
    onOpen('result-home')
} else if(location.pathname == '/pos-graduacao') {
    onOpen('graduation-home')
} 
    }, [location]);
  
console.log(idGraduateProgram)



    return(
        <>
        <SearchLayout
         defaultLayout={defaultLayout}
         defaultCollapsed={isCollapsed}
         navCollapsedSize={navCollapsedSize}
        >
            <GeralProvider/>

        </SearchLayout>
        </>
    )
}