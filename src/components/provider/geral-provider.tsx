"use client";

import { useEffect, useState } from "react";
import { InitialHome } from "../homepage/inital-home";

import { ResultHome } from "../homepage/result-home";
import { GraduateProgram } from "../graduate-program/graduate-program";

import { useModalHomepage } from "../hooks/use-modal-homepage";
import { Dicionario } from "../dicionario/dicionario";
import { ContentIndicators } from "../indicators/content-indicators";
import { NewsArticles } from "../novas-publicacoes/new-articles";
import { Info } from "../info/info";
import { GruposPesquisaPage } from "../grupos-pesquisa/grupos-pesquisa";
import { DepartamentPage } from "../departamentos/departamentos-page";
import { ResearcherPage } from "../researcher/researcher-page";
import { Maria } from "../maria/maria";
import { TodosPesquisadores } from "../homepage/categorias/researchers-home/todos-pesquisadores";
import { PaineisDadosExternos } from "../homepage/paines-dados-externos";
import { IndicePesquisador } from "../indice-pesquisador/indice-pesquisador";

const ModalContent = () => {
  const { type } = useModalHomepage();

  switch (type) {
    case 'dicionario':
      return <Dicionario/>
    case 'initial-home':
      return <InitialHome/>
    case 'graduation-home':
      return <GraduateProgram/>
    case 'result-home':
      return <ResultHome/>
    case 'indicadores' :
      return <ContentIndicators/>
    case 'producoes-recentes':
      return <NewsArticles/>
    case 'informacoes':
      return <Info/>
    case 'grupos-pesquisa':
      return <GruposPesquisaPage/>
    case 'departamentos':
      return <DepartamentPage/>
    case 'pesquisador':
      return <ResearcherPage/>
    case 'maria':
      return <Maria/>
    case 'docentes-tecnicos':
      return <TodosPesquisadores/>
    case 'paines-dados-externos':
      return <PaineisDadosExternos/>
    case 'indice-pesquisador':
      return <IndicePesquisador/>
  }
}

export const GeralProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ModalContent/>
}