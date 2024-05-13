
import { useContext, useEffect } from "react";
import SearchLayout from "../layout/search-layout";
import { UserContext } from "../context/context";
import { GeralProvider } from "../components/provider/geral-provider";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";
import { useLocation, useParams } from "react-router-dom";
import SimpleLayout from "../layout/simple-layout";

export function Baremas() {
    const { onOpen } = useModalHomepage();
    const {setIdDocumentBarema, idDocumentBarema} = useContext(UserContext)
    const location = useLocation();
    const {  baremaId } = useParams<{
        baremaId:string
      }>();

    
      if (baremaId) {
        setIdDocumentBarema(baremaId);
      } else {
        // Trate o caso em que baremaId é undefined, se necessário
      }


    console.log('ahhhhhhhhhhh', idDocumentBarema)


    useEffect(() => {
        if (location.pathname === `/barema/${baremaId}`) { // Assuming baremaId comes from useParams
            onOpen('baremas');
        } else if (location.pathname === `/barema`) { // Assuming baremaId comes from useParams
            onOpen('baremas');
        } else if (location.pathname === '/meus-baremas') {
            onOpen('meus-baremas');
        } else {
            // Handle unexpected pathname
            console.error('Unexpected pathname:', location.pathname);
        }
    }, [location.pathname, baremaId]); // Include baremaId in the dependency array if it's used inside useEffect
    
  

    return(
        <>
        <SimpleLayout>
            <GeralProvider/>

        </SimpleLayout>
        </>
    )
}