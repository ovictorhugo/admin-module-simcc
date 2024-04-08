
import { useContext, useEffect } from "react";
import SearchLayout from "../layout/search-layout";
import { UserContext } from "../context/context";
import { InitialHome } from "../components/homepage/inital-home";
import { GeralProvider } from "../components/provider/geral-provider";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";
import { useLocation } from "react-router-dom";

export function Home() {
    const { onOpen } = useModalHomepage();
    

    const location = useLocation();
    

    const {valoresSelecionadosExport} = useContext(UserContext)

    useEffect(() => {
        if(location.pathname == '/' && valoresSelecionadosExport.length == 0) {
            onOpen('initial-home')
        }
    }, [location]);


    return(
        <>
        <SearchLayout>
            <GeralProvider/>

        </SearchLayout>
        </>
    )
}