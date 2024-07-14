import { MagnifyingGlass } from "phosphor-react";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { List } from "lucide-react";
import { Link } from "react-router-dom";

export function Instrucoes() {
    return(
        <div className="grid gap-6 md:grid-cols-2 md:min-h-screen">
            <div className="h-screen flex justify-center flex-col sticky top-0">
                <h2 className="text-5xl  lg:leading-[1.1] leading-tight tracking-tighter font-bold max-w-[420px] mb-4">O que a plataforma pode fazer e como ela pode te auxiliar?</h2>
                <p className="max-w-[550px] mb-4  text-lg font-light text-foreground">O Conectee é uma plataforma desenvolvida com o objetivo de auxiliar na seleção e filtragem das produções dos pesquisadores da Escola de Engenharia da UFMG. </p>
               <div className="flex gap-3">
              
              <Link to={'/resultados'}> <Button className="w-fit"><MagnifyingGlass size={16}/>Fazer uma pesquisa</Button></Link>
              <Link to={'/dicionario'}> <Button className="w-fit" variant={'ghost'}><List size={16}/>Dicionário de termos</Button></Link>
               </div>
            </div>

            <div className="flex flex-col gap-8 md:ml-24">
                <Alert className="h-[500px]"></Alert>

                <Alert className="h-[500px]"></Alert>

                <Alert className="h-[500px]"></Alert>
            </div>

        </div>
    )
}