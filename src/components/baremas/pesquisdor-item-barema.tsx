import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/context"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

type Research = {
    A1: string,
    A2: string,
    A3: string,
    A4: string,
    B1: string,
    B2: string,
    B3: string,
    B4: string,
    C: string,
    SQ: string,
    book: string,
    book_chapter: string,
    brand: string,
    event_organization: string,
    d_in_progress: string,
    d_completed: string,
    e_in_progress: string,
    e_completed: string,
    g_in_progress: string,
    g_completed: string,
    ic_in_progress: string,
    ic_completed: string,
    m_in_progress: string,
    m_completed: string,
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

interface Categoria {
    id_criterio: number;
    criterio: string;
    pontos: string,
    pontuacao_max: string,
    id_grupo: string,
    pesquisadores: PesquisadorUpdate[]
}

interface Grupo {
    id: string;
    titulo: string;
    descricao: string;
    categorias: Categoria[];
    quantidade_max_pontos: number;
    // outras propriedades do grupo
}

type PesquisadorUpdate = {
    total: number,
    id: string,
    name: string,
    id_criterio: number
}

type Props = {
    pontos: number,
    pontuacao_max: number,
    id_criterio: number,
    researcherSelecionados: Research[],
    onPesquisadoresUpdate: (newPesquisdor: PesquisadorUpdate) => void,
    grupos: Grupo[]
}

export function PesquisadorItemBarema(config: Props) {
    const { pesquisadoresSelecionados, urlGeral } = useContext(UserContext)

    console.log("GRUPOS NO COMPONENTE BAREMA: ", config.grupos);

    const calcularPontuacao = (pesquisador: any) => {
        switch (config.id_criterio) {
            case 1: // Pós-doutorado
                if (pesquisador.graduation === "Pós-Doutorado") {
                    return config.pontos >= config.pontuacao_max ? config.pontuacao_max : config.pontos
                }

                return 0;
            case 2: // Doutorado
                if (pesquisador.graduation === "Doutorado") {
                    return (
                        config.pontos >= config.pontuacao_max ? config.pontuacao_max : config.pontos
                    )
                }
                return 0;
            case 3: // Mestrado
                if (pesquisador.graduation === "Mestrado") {
                    return config.pontos >= config.pontuacao_max ? config.pontuacao_max : config.pontos
                }
                return 0;
            case 4: // Especialista
                break;
            case 5: // Artigo em periódicos qualificados (A a C)
                return (config.pontos * Number(pesquisador.A1) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.A1)))
            case 19:
                return (config.pontos * Number(pesquisador.A1 + pesquisador.A2 + pesquisador.A3 + pesquisador.A4 + pesquisador.B1 + pesquisador.B2 + pesquisador.B3 + pesquisador.B4 + pesquisador.C) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.A1 + pesquisador.A2 + pesquisador.A3 + pesquisador.A4 + pesquisador.B1 + pesquisador.B2 + pesquisador.B3 + pesquisador.B4 + pesquisador.C)))
            case 20: //Artigo A1
                return (config.pontos * Number(pesquisador.A1) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.A1)))
            case 21: // Artigo A2
                return (config.pontos * Number(pesquisador.A2) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.A2)))
            case 22: // Artigo A3
                return (config.pontos * Number(pesquisador.A3) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.A3)))
            case 23: // Artigo A4
                return (config.pontos * Number(pesquisador.A4) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.A4)))
            case 24: // Artigo B1
                return (config.pontos * Number(pesquisador.B1) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.B1)))
            case 25: // Artigo B2
                return (config.pontos * Number(pesquisador.B2) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.B2)))
            case 26: // Artigo B3
                return (config.pontos * Number(pesquisador.B3) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.B3)))
            case 27: // Artigo B4
                return (config.pontos * Number(pesquisador.B4) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.B4)))
            case 28: // Artigo C
                return (config.pontos * Number(pesquisador.C) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.C)))
            case 6: // Artigos completos em anais de eventos
                return (config.pontos * Number(pesquisador.work_in_event) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.work_in_event)))

            // Consertar daqui pra baixo

            case 12:
                // Pós-Graduação Stricto Sensu - andamento
                return ((config.pontos * (Number(pesquisador.guidance_d_a) + Number(pesquisador.guidance_m_a))) >= config.pontuacao_max ? (config.pontuacao_max) : ((config.pontos * (Number(pesquisador.guidance_d_a) + Number(pesquisador.guidance_m_a)))))
            case 13:
                // Iniciação Científica - andamento
                return (config.pontos * Number(pesquisador.guidance_ic_a) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_ic_a)))
            case 30:
                // Mestrado - andamento
                return (config.pontos * Number(pesquisador.guidance_m_a) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_m_a)))
            case 29:
                // Doutorado - andamento
                return (config.pontos * Number(pesquisador.guidance_d_a) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_d_a)))
            case 31:
                // Pós-Graduação Stricto Sensu - concluido
                return ((config.pontos * (Number(pesquisador.guidance_d_c) + Number(pesquisador.guidance_m_c))) >= config.pontuacao_max ? (config.pontuacao_max) : ((config.pontos * (Number(pesquisador.guidance_d_c) + Number(pesquisador.guidance_m_c)))))
            case 16:
                // Iniciação Científica - concluido
                return (config.pontos * Number(pesquisador.guidance_ic_c) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_ic_c)))
            case 15:
                // Mestrado - concluido
                return (config.pontos * Number(pesquisador.guidance_m_c) >= config.pontuacao_max ? (config.pontuacao_max) : (config.pontos * Number(pesquisador.guidance_m_c)))
            case 14:
                // Doutorado - concluido
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
    }, [config.researcherSelecionados, config.pontos, config.pontuacao_max, config.id_criterio]);

    return (
        <ScrollArea>
            <div className="flex gap-3 items-center w-full overflow-x-auto flex-nowrap">
                {Array.isArray(config.researcherSelecionados) && config.researcherSelecionados.map((props) => {
                    return (
                        <div key={props.id} className="group flex transition-all">
                            <div className="flex">
                                <TooltipProvider key={props.id}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex items-center">
                                                {
                                                    [1, 2, 3, 4].includes(config.id_criterio) && calcularPontuacao(props) !== 0 && (
                                                        <div
                                                            className="
                                                            rounded-md w-10 h-10 bg-cover bg-center bg-no-repeat
                                                            rounded-l-lg rounded-r-none border dark:border-neutral-800 border-r-0 bg-white
                                                            dark:bg-neutral-700
                                                        "
                                                            style={{
                                                                backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.id}) `
                                                            }}
                                                        >
                                                        </div>

                                                    )
                                                }
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {config.researcherSelecionados.filter((pesquisador) => pesquisador.researcher === props.researcher).map((pesquisador) => {
                                                return (
                                                    <div key={pesquisador.id} className="flex items-center gap-3">
                                                        {
                                                            [1, 2, 3, 4].includes(config.id_criterio) && calcularPontuacao(props) !== 0 && (
                                                                <div className="flex items-center gap-2">
                                                                    <div
                                                                        className="
                                                                            rounded-md w-8 h-8 bg-cover bg-center bg-no-repeat
                                                                            rounded-l-lg rounded-r-none border dark:border-neutral-800 border-r-0 bg-white
                                                                            dark:bg-neutral-700
                                                                        "
                                                                        style={{
                                                                            backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${pesquisador.id}) `
                                                                        }}
                                                                    ></div>
                                                                    <p>{pesquisador.researcher}</p>
                                                                </div>

                                                            )
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </TooltipContent>
                                    </Tooltip>
                                    {
                                        [1, 2, 3, 4].includes(config.id_criterio) && calcularPontuacao(props) !== 0 && (
                                            <div
                                                className="
                                                    h-10 w-10 text-xs flex items-center justify-center
                                                    transition-all dark:bg-neutral-950 bg-white
                                                    border-neutral-200 dark:border-neutral-800 border text-gray-500 dark:text-white rounded-r-md
                                                "
                                            >
                                                {parseFloat(calcularPontuacao(props)?.toString() || '0').toFixed(2)}
                                            </div>

                                        )
                                    }
                                </TooltipProvider>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}