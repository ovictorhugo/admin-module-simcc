"use client";

import { useEffect, useState } from "react";
import { InitialHome } from "../homepage/inital-home";
import { MariaHome } from "../homepage/maria-home";
import { ResultHome } from "../homepage/result-home";
import { GraduateProgram } from "../graduate-program/graduate-program";
import { BaremasHome } from "../baremas/baremas-home";
import { MeusBaremasHome } from "../baremas/meus-baremas";
import { ProcurarBaremas } from "../baremas/procurar-barema-public";
import { ResultProcurarBaremas } from "../baremas/result-procurar-barema";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { Dicionario } from "../dicionario/dicionario";
import { ContentIndicators } from "../indicators/content-indicators";

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