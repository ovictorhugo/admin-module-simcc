"use client";

import { useEffect, useState } from "react";
import { SearchModal } from "../modals/search-modal";
import { AddGraduateProgram } from "../modals/add-graduate-program";
import { MapResearchersModal } from "../modals/map-researchers-modal";
import { ResearcherModal } from "../modals/researcher-modal";
import { ArticlesModal } from "../modals/articles-modal";
import { ConfirmDeleteResearcher } from "../modals/confirm-delete-researcher";
import {ConfirmDeletePosGraduateProgram} from "../modals/confirm-delete-pos-graduate-program"
import { EditGraduateProgram } from "../modals/edit-graduate-program";
import { AddResearcherGraduation } from "../modals/add-researcher-graduation-modal";
import { AddResearcherCsvModal } from "../modals/add-researcher-csv-modal";
import { AddStudentGraduationModal } from "../modals/add-student-graduation-modal";
import { AddGrupoPesquisaModal } from "../modals/add-grupo-pesquisa";
import { PesquisadoresSelecionados } from "../modals/pesquisadores-selecionados";
import { FiltersModal } from "../modals/filters-modal";
import { ListStudentProgramModal } from "../modals/list-student-program";
import { AddResearcherGraduationTwo } from "../modals/add-researcher-graduation-two";
import { GratuateProgramModal } from "../modals/gratuate-program";

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
    <ConfirmDeletePosGraduateProgram/>
    <EditGraduateProgram/>
    <AddResearcherGraduation/>
    <AddResearcherCsvModal/>
    <AddStudentGraduationModal/>
    <AddGrupoPesquisaModal/>
    <PesquisadoresSelecionados/>
    <FiltersModal/>
    <ListStudentProgramModal/>
    <AddResearcherGraduationTwo/>
    <GratuateProgramModal/>
    </>
  )
}