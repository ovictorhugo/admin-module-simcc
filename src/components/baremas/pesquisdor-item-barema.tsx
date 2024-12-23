import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/context"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

type Research = {
    article_A1: string,
    article_A2: string,
    article_A3: string,
    article_A4: string,
    article_B1: string,
    article_B2: string,
    article_B3: string,
    article_B4: string,
    article_C: string,
    article_SQ: string,
    book: string,
    book_chapter: string,
    brand: string,
    event_organization: string,
    guidance_d_a: string,
    guidance_d_c: string,
    guidance_e_a: string,
    guidance_e_c: string,
    guidance_g_a: string,
    guidance_g_c: string,
    guidance_ic_a: string,
    guidance_ic_c: string,
    guidance_m_a: string,
    guidance_m_c: string,
    participation_event: string,
    patent: string,
    researcher: string,
    software: string,
    work_in_event: string,

    id: string
    name: string,
    university: string,
    lattes_id: string,
    city: string,
    area: string,
    graduation: string,

}

type PesquisadorUpdate = {
    total: number,
    id: string,
    name: string,
    id_criterio: number
}

type Props = {
    pontos: number
    pontuacao_max: number
    id_criterio: number

    researcherSelecionados: Research

    onPesquisadoresUpdate: (newPesquisdor: PesquisadorUpdate) => void

}

export function PesquisadorItemBarema(config: Props) {
    const { pesquisadoresSelecionados, urlGeral } = useContext(UserContext)


    const calcularPontuacao = (pesquisador: any) => {
        switch (config.id_criterio) {
            case 1:
                break

            case 2:


                break;
            case 3:


                break;
            case 4:


                break;
            case 5:
                //Artigo em periódicos qualificados (A a C)
                return (config.pontos * Number(pesquisador.article_A1) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_A1)))

            case 20:
                //Artigo A1
                return (config.pontos * Number(pesquisador.article_A1) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_A1)))

            case 21:
                //Artigo A2
                return (config.pontos * Number(pesquisador.article_A2) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_A2)))

            case 22:
                //Artigo A3
                return (config.pontos * Number(pesquisador.article_A3) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_A3)))

            case 23:
                //Artigo A4
                return (config.pontos * Number(pesquisador.article_A4) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_A4)))

            case 24:
                //Artigo B1
                return (config.pontos * Number(pesquisador.article_B1) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_B1)))

            case 25:
                //Artigo B1
                return (config.pontos * Number(pesquisador.article_B2) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_B2)))

            case 26:
                //Artigo B3
                return (config.pontos * Number(pesquisador.article_B3) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_B3)))

            case 27:
                //Artigo B4
                return (config.pontos * Number(pesquisador.article_B4) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_B4)))

            case 28:
                //Artigo C
                return (config.pontos * Number(pesquisador.article_C) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.article_C)))

            case 6:
                // Artigos completos em anais de eventos
                return (config.pontos * Number(pesquisador.work_in_event) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.work_in_event)))

            case 12:
                //Pós-Graduação Stricto Sensu - andamento
                return ((config.pontos * (Number(pesquisador.guidance_d_a) + Number(pesquisador.guidance_m_a))) >= config.pontuacao_max ? (config.pontuacao_max) : ((config.pontos * (Number(pesquisador.guidance_d_a) + Number(pesquisador.guidance_m_a)))))

            case 13:
                //Iniciação Científica - andamento
                return (config.pontos * Number(pesquisador.guidance_ic_a) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_ic_a)))

            case 30:
                //Mestrado - andamento
                return (config.pontos * Number(pesquisador.guidance_m_a) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_m_a)))

            case 29:
                //Doutorado - andamento
                return (config.pontos * Number(pesquisador.guidance_d_a) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_d_a)))

            case 31:
                //Pós-Graduação Stricto Sensu - concluido
                return ((config.pontos * (Number(pesquisador.guidance_d_c) + Number(pesquisador.guidance_m_c))) >= config.pontuacao_max ? (config.pontuacao_max) : ((config.pontos * (Number(pesquisador.guidance_d_c) + Number(pesquisador.guidance_m_c)))))

            case 16:
                //Iniciação Científica - concluido
                return (config.pontos * Number(pesquisador.guidance_ic_c) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_ic_c)))

            case 15:
                //Mestrado - concluido
                return (config.pontos * Number(pesquisador.guidance_m_c) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_m_c)))

            case 14:
                //Doutorado - concluido
                return (config.pontos * Number(pesquisador.guidance_d_c) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_d_c)))

            default:
                return 0;
        }
    }

    // Função para formatar os dados do pesquisador
    const formatResearcherData = (researcher: Research, teste: any) => ({
        total: teste,
        id: researcher.id,
        name: researcher.researcher,
        id_criterio: config.id_criterio
    });

    // Função para lidar com a atualização dos pesquisadores
    const handlePesquisadoresUpdate = (updateValue: any) => {
        if (updateValue !== false) {
            const formattedPesquisadores = Array.isArray(config.researcherSelecionados) && config.researcherSelecionados.map(researcher => formatResearcherData(researcher, calcularPontuacao(researcher)));
            if (formattedPesquisadores !== false) {
                if (formattedPesquisadores.length > 0) {
                    config.onPesquisadoresUpdate(formattedPesquisadores[0]);
                }
            } else {
                console.error('Update value is false, cannot update.');
            }
        } else {
            console.error('Update value is false, cannot update.');
        }
    };

    // Chamada da função para atualizar os pesquisadores quando houver mudanças
    useEffect(() => {
        handlePesquisadoresUpdate(config.researcherSelecionados);
    }, [config.researcherSelecionados, config.pontos, config.pontuacao_max]);

    return (
        <ScrollArea>
            <div className="flex gap-3 items-center w-full overflow-x-auto flex-nowrap">
                {Array.isArray(config.researcherSelecionados) && config.researcherSelecionados.map((props) => {

                    return (
                        <div key={props.id} className="group flex transition-all ">
                            <div className=" rounded-md w-10 h-10 bg-cover bg-center bg-no-repeat rounded-l-lg rounded-r-none border dark:border-neutral-800 border-r-0 bg-white dark:bg-neutral-700" style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.id}) ` }}></div>
                            <div className="h-10 w-10 text-xs flex items-center justify-center transition-all dark:bg-neutral-950 bg-white border-neutral-200 dark:border-neutral-800 border text-gray-500 dark:text-white rounded-r-md">
                                {parseFloat(calcularPontuacao(props)?.toString() || '0').toFixed(2)}
                            </div>

                        </div>
                    )
                })}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}