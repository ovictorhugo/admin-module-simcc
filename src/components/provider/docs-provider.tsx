"use client";

import { useEffect, useState } from "react";
import { ArticlesHome } from "../homepage/categorias/articles-home";
import { ResearchersHome } from "../homepage/categorias/researchers-home";

import { useModalResult } from "../hooks/use-modal-result";
import { PatentHome } from "../homepage/categorias/patent-home";
import { BookHome } from "../homepage/categorias/book-home";
import { SpeakerHome } from "../homepage/categorias/speaker-home";
import { InstitutionsHome } from "../homepage/categorias/institutions-home";
import { useModalDocs } from "../hooks/use-modal-docs";
import { TermosUso } from "../docs-api/termos-uso";
import { PoliticaPrivacidade } from "../docs-api/politica-privacidade";
import { ApiDocs } from "../docs-api/api-docs";
import { DicionarioCores } from "../docs-api/dicionario-cores";
import { Info } from "../info/info";


const ModalContent = () => {
  const { type } = useModalDocs();

  switch (type) {
    case 'termos-uso':
      return <TermosUso/>
      case 'politica-privacidade':
        return <PoliticaPrivacidade/>
        case 'api-docs':
            return <ApiDocs/>
            case 'dicionario-cores':
            return <DicionarioCores/>
            case 'informacoes':
              return <Info/>
  }

}
export const DocsProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ModalContent />

}