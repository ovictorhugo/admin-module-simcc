import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { UserContext } from "../../../context/context";
import { Home, Info, ShieldCheck, AlertTriangle } from "lucide-react";
import { useContext } from "react";
import { getVersion } from "../../../gerVersion";

import bg_popup from "../../../assets/bg_home.png";

export function Pesquisadores() {

  const { version } = useContext(UserContext);
      const platform = version ? "Conectee" : "Simcc";
      const version2 = getVersion();

    return(
        <main className="p-4 md:p-8 bg-neutral-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100">
             <div className="max-w-[936px] mx-auto space-y-8">
                 {/* Header */}
       <Alert className='p-0'>
       <Alert className="flex border-0 rounded-b-none justify-between items-center bg-neutral-100 dark:bg-neutral-800 border-b-0 p-4 md:p-6 rounded-md">
          <AlertTitle className="text-base font-medium text-gray-600 dark:text-gray-300">
            API Pesquisadores (GET)
          </AlertTitle>
          <Link to="/">
            <Button variant="outline">
              <Home size={16} className="mr-2" />
              Página Inicial
            </Button>
          </Link>

          
        </Alert>

          {/* Banner Hero */}
          <div
          className="p-8 rounded-t-none md:p-12 bg-cover bg-center rounded-md"
          style={{ backgroundImage: `url(${bg_popup})` }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Plataforma {platform}
          </h1>
          <p className="text-sm font-light">
            Versão da plataforma: {version2}
          </p>
        </div>
       </Alert>

       <Alert className="space-y-4 p-8">
       <h2 className="text-2xl font-semibold">Introdução</h2>
       <p>
            A plataforma <strong>{platform}</strong> é fruto de uma colaboração institucional entre Escola de Engenharia da UFMG, Universidade do Estado da Bahia (UNEB), Universidade do Recôncavo da Bahia (UFRB), Universidade Estadual de Snta Cruz (UESC) e Secretaria de Ciência, Tecnologia e Inovação (SECTI), com o objetivo de transformar a forma como dados acadêmicos e científicos são organizados e utilizados.
          </p>
       </Alert>

             </div>
        </main>
    )
}