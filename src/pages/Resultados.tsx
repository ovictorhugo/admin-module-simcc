
import { useContext, useEffect } from "react";
import SearchLayout from "../layout/search-layout";
import { UserContext } from "../context/context";
import { GeralProvider } from "../components/provider/geral-provider";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";
import { useLocation, useParams } from "react-router-dom";


export function Resultados() {
    const { onOpen } = useModalHomepage();
    const {navCollapsedSize, defaultLayout, setIdGraduateProgram, isCollapsed, idGraduateProgram, valoresSelecionadosExport, setValoresSelecionadosExport, setItensSelecionados, setSearchType, searchType} = useContext(UserContext)

  

    const location = useLocation();


  function parseTerms(str: string): { term: string }[] {
    let result: { term: string }[] = [];
    let temp = '';
    let insideGroup = false;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            insideGroup = true;
            continue;
        }
        if (str[i] === ')') {
            insideGroup = false;
            if (temp.length > 0) {
                // Split the grouped terms and add them as separate objects
                temp.split(';').forEach(term => {
                    result.push({ term: term.trim() + ';' });
                });
                temp = '';
            }
            continue;
        }
        if (str[i] === '|') {
            if (!insideGroup && temp.length > 0) {
                result.push({ term: temp.trim() + '|' });
                temp = '';
            }
            continue;
        }
        temp += str[i];
    }

    // Handle any remaining term outside of groups
    if (temp.length > 0) {
        result.push({ term: temp.trim() });
    }

    return result;
}





     

    useEffect(() => {
 if(location.pathname == `/resultados`) {
            onOpen('result-home')
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