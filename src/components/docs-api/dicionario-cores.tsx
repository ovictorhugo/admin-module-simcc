// src/components/PoliticaPrivacidade.tsx
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Info, ShieldCheck, AlertTriangle, Globe, Lock, Home } from "lucide-react";
import bg_popup from "../../assets/bg_home.png";
import { getVersion } from "../../gerVersion";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import { Card } from "../ui/card";

export function DicionarioCores() {
    const { version } = useContext(UserContext);
    const platform = version ? "Conectee" : "Simcc";
  const version2 = getVersion();

    return(
        <main className="p-4 md:p-8 bg-neutral-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-[936px] mx-auto space-y-8">

        {/* Header */}
        <Alert className="p-0">
          <Alert className="flex border-0 rounded-b-none justify-between items-center bg-neutral-100 dark:bg-neutral-800 p-4 md:p-6 rounded-md">
            <AlertTitle className="text-base font-medium text-gray-600 dark:text-gray-300">
              Dicionário de cores
            </AlertTitle>
            <Link to="/">
              <Button variant="outline">
                <Home size={16} className="mr-2" />
                Página Inicial
              </Button>
            </Link>
          </Alert>

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
          <h2 className="text-2xl font-semibold">Sobre o dicionário</h2>
         
         <p>
         O dicionário de cores do {platform} foi criado para padronizar a identificação visual de status, tipos de produção acadêmica, áreas de grupos de pesquisa, programas de pós-graduação,alertas no sistema, entre outros. Cada cor, definida em hexadecimal e aplicada via Tailwind CSS, facilita a leitura rápida e intuitiva das informações, diferenciando dados validados, pendentes ou com erro, além de destacar categorias específicas como produções técnicas e científicas.
         </p>
         <Alert>
            <p>Essa padronização garante organização, acessibilidade, coesão visual e eficiência na navegação em toda a plataforma.</p>
         </Alert>
         
        </Alert>
        </div>
        </main>
    )
}