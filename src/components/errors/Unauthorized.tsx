import { useTheme } from "next-themes";
import { LogoConectee } from "../svg/LogoConectee";
import { LogoConecteeWhite } from "../svg/LogoConecteeWhite";
import { useEffect, useState } from "react";
import bg_popup from '../../assets/bg_home.png';
import { Link } from "react-router-dom";

export function Unauthorized() {
    const { theme } = useTheme()
    const [clientId, setClientId] = useState<string | null>(null);
    const [provider, setProvider] = useState<string | null>(null);

    useEffect(() => {
        const url = new URL(window.location.href);
        const pathname = url.pathname.split('/');
        
        // Supondo que o ID do cliente seja o segundo segmento do caminho da URL
        const id = pathname[1] || null;
        setClientId(id);

        // Supondo que o provedor seja o hostname do URL
        const providerName = url.hostname;
        setProvider(providerName);
    }, []);

    return(
        <div style={{ backgroundImage: `url(${bg_popup})` }} className="h-screen bg-cover bg-no-repeat bg-center w-full flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                        <Link to={'/'} className='h-10 mb-24 absolute top-16 '>
            {theme == 'dark' ? (<LogoConecteeWhite/>):(<LogoConectee/>)}
        </Link>
        <div className="w-full flex flex-col items-center justify-center">
                <p className="text-9xl text-[#719CB8] font-bold mb-16 animate-pulse">{`(¬_¬")`}</p>
                <h1 className=" text-4xl text-neutral-400 font-medium leading-tight tracking-tighter lg:leading-[1.1] ">Você não tem permissão para acessar essa página</h1>
               
                <p className="font-medium text-sm mt-2">
                  Código do erro: 500
                </p>

                <p className="font-medium text-sm">
                Servidor: {provider}
                </p>

                <p className="font-medium text-sm ">
                  Caminho da URL: {clientId}
                </p>

              </div>
     
        </div>
    )
}