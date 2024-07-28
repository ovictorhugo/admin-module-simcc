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

import { ListStudentProgramModal } from "../modals/list-student-program";
import { AddResearcherGraduationTwo } from "../modals/add-researcher-graduation-two";
import { GratuateProgramModal } from "../modals/gratuate-program";
import { ConfirmDeleteResearcherGraduateProgram } from "../modals/confirm-delete-researcher-graduate-program";
import { ConfirmDeleteStudentGraduateProgram } from "../modals/confirm-delete-student-graduate-program";
import { useModal } from "../hooks/use-modal-store";
import { ImportBolsistas } from "../modals/import-bolsistas";
import { ImportDocentes } from "../modals/import-docentes";
import { ImportTaes } from "../modals/import-taes";
import { FiltersModal } from "../homepage/categorias/researchers-home";
import { AddDepartamento } from "../modals/add-departamento";
import { ConfirmDeleteDepartamento } from "../modals/confirm-delete-departamento";
import { ImportDisciplina } from "../modals/import-disciplina";

const ModalContent = () => {
  const { type } = useModal();

  switch (type) {
    case 'add-graduate-program':
      return  <AddGraduateProgram/>
      case 'search':
        return  <SearchModal/>
      case 'confirm-delete-pos-graduate-program':
        return  <ConfirmDeletePosGraduateProgram/>
      case 'confirm-delete-researcher':
        return <ConfirmDeleteResearcher/>
      case 'confirm-delete-researcher-graduate-program':
        return <ConfirmDeleteResearcherGraduateProgram/>
      case 'confirm-delete-student-graduate-program':
        return <ConfirmDeleteStudentGraduateProgram/>
     
      case 'edit-graduate-program':
        return <EditGraduateProgram/>
      case 'articles-modal':
        return <ArticlesModal/>
      case 'researcher-modal':
        return <ResearcherModal/>
      case 'import-bolsistas':
        return <ImportBolsistas/>
      case  'import-docentes':
        return <ImportDocentes/>
      case 'import-taes':
        return <ImportTaes/>
      case 'add-researcher-csv':
        return <AddResearcherCsvModal/>
      case 'add-grupo-pesquisa':
        return <AddGrupoPesquisaModal/>
      case 'add-departamento':
        return <AddDepartamento/>
      case 'confirm-delete-departamento':
        return <ConfirmDeleteDepartamento/>
      case 'edit-departamento':
        return <AddDepartamento/>
      case 'import-disciplina':
        return <ImportDisciplina/>

    default:
      return null;
  }
};


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ModalContent />
}