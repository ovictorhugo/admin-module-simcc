import { MagnifyingGlass } from "phosphor-react";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Filter, List, MessagesSquare, TextCursorInput } from "lucide-react";
import { Link } from "react-router-dom";
import { CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { useContext } from "react";
import { UserContext } from "../../../context/context";

export function Instrucoes() {

    const {version} = useContext(UserContext)

    return(
        <div className="grid gap-6 lg:grid-cols-2 md:min-h-screen">
            <div className="h-screen flex justify-center flex-col lg:sticky top-0">
                <h2 className="text-5xl  lg:leading-[1.1] leading-tight tracking-tighter font-bold max-w-[420px] mb-4">O que a plataforma pode fazer e como ela pode te auxiliar?</h2>
                <p className="max-w-[550px] mb-4  text-lg font-light text-foreground">O Conectee é uma plataforma desenvolvida com o objetivo de auxiliar na seleção e filtragem das produções dos pesquisadores {version ? ('da Escola de Engenharia.'):('do SENAI CIMATEC.')} </p>
               <div className="flex gap-3">
              
              <Link to={'/resultados'}> <Button className="w-fit"><MagnifyingGlass size={16}/>Fazer uma pesquisa</Button></Link>
              <Link to={'/dicionario'}> <Button className="w-fit" variant={'ghost'}><List size={16}/>Dicionário de termos</Button></Link>
               </div>
            </div>

            <div className="flex flex-col gap-8 lg:ml-24 xl:ml-48">
                <Alert className="">
                    <CardHeader>
                    <div className="h-[300px] flex items-center justify-center"><TextCursorInput size={120} className="text-[#719CB8]"/></div>
                        <CardTitle className="font-medium text-3xl">1. Use palavras-chave específicas</CardTitle>
                        <CardDescription>Tente usar palavras-chave específicas que descrevem o tópico que você está procurando. Por exemplo, em vez de pesquisar por "robótica", pesquise por "robótica educacional". Você pode fazer a pesquisa com mais de uma palavra-chave e concatenar com 'E' ou 'OU'</CardDescription>
                    </CardHeader>
                </Alert>

                <Alert className="">
                    <CardHeader>
                        <div className="h-[300px] flex items-center justify-center"><MessagesSquare size={120} className="text-[#719CB8]"/></div>
                        <CardTitle className="font-medium text-3xl">2. Você pode utilizar a MarIA para aprimorar a busca</CardTitle>
                        <CardDescription>Tente usar palavras-chave específicas que descrevem o tópico que você está procurando. Por exemplo, em vez de pesquisar por "robótica", pesquise por "robótica educacional". Você pode fazer a pesquisa com mais de uma palavra-chave e concatenar com 'E' ou 'OU'</CardDescription>
                    </CardHeader>
                </Alert>

                <Alert className="">
                    <CardHeader>
                    <div className="h-[300px] flex items-center justify-center"><Filter size={120} className="text-[#719CB8]"/></div>
                        <CardTitle className="font-medium text-3xl">3. Utilize filtros de pesquisa</CardTitle>
                        <CardDescription>Limite os resultados da pesquisa usando categorias que possuem diferentes critérios de seleção. Por exemplo, é possível buscar por termos em artigos, em resumo, patentes, nome de pesquisador ou por área de especialidade. Você pode usar os filtros na plataforma para refinar o resultado da pesquisa por qualis, ano ou área de atuação.</CardDescription>
                    </CardHeader>
                </Alert>

                <Alert className="">
                    <CardHeader>
                    <div className="h-[300px] flex items-center justify-center"><List size={120} className="text-[#719CB8]"/></div>
                        <CardTitle className="font-medium text-3xl">4. Veja o dicionário de termos</CardTitle>
                        <CardDescription>Em caso de dúvida de qual palavra utilizar para realizar sua pesquisa, acesse o dicionário de termos com mais de 36 mil palavras disponíveis para refinar a sua busca. Você também pode pesquisar as informações das revistas (ISSN, qualis e JCR).</CardDescription>
                    </CardHeader>
                </Alert>
            </div>

        </div>
    )
}