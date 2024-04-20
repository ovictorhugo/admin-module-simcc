"use client";

import { useEffect, useState } from "react";
import { SearchModal } from "../modals/search-modal";
import { AddGraduateProgram } from "../modals/add-graduate-program";
import { MapResearchersModal } from "../modals/map-researchers-modal";
import { ResearcherModal } from "../modals/researcher-modal";
import { ArticlesModal } from "../modals/articles-modal";
import { ConfirmDeleteResearcher } from "../modals/confirm-delete-researcher";


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <SearchModal/>
    <AddGraduateProgram/>
    <MapResearchersModal/>
    <ResearcherModal/>
    <ArticlesModal/>
    <ConfirmDeleteResearcher/>
    </>
  )
}