import { useTheme } from "next-themes";
import { LogoConectee } from "../components/svg/LogoConectee";
import { LogoConecteeWhite } from "../components/svg/LogoConecteeWhite";


import { useContext, useEffect } from "react";
import { UserContext } from "../context/context";

import { getVersion } from "../gerVersion";
import DocsLayout from "../layout/docs-layout";
import { DocsProvider } from "../components/provider/docs-provider";
import { useModalDocs } from "../components/hooks/use-modal-docs";
import { useLocation } from "react-router-dom";

export function TermosUso() {
    const { theme } = useTheme();
    const { version , defaultLayout, navCollapsedSize, isCollapsed} = useContext(UserContext);
const {onOpen} = useModalDocs()
    const location = useLocation();
        useEffect(() => {
          if(location.pathname == '/termos-uso') {
          onOpen('termos-uso')
      } else  if(location.pathname == `/politica-privacidade`) {
        onOpen('politica-privacidade')
    }  else  if(location.pathname == `/api-docs`) {
        onOpen('api-docs')
    } else if(location.pathname == '/informacoes') {
        onOpen('informacoes')
    }  else if(location.pathname == '/dicionario-cores') {
        onOpen('dicionario-cores')
    } else if(location.pathname == '/api-docs/pesquisadores') {
        onOpen('pesquisadores')
    } 
        }, [location]);
      

    return (
       <DocsLayout
              defaultLayout={defaultLayout}
              defaultCollapsed={isCollapsed}
              navCollapsedSize={navCollapsedSize}
             >
                 <DocsProvider/>
             </DocsLayout>
    );
}
