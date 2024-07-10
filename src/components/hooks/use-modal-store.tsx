
import { create } from "zustand";

export type ModalType = "search" | "add-graduate-program" | "cookies" | "map-researchers-modal" | 'researcher-modal' | 'articles-modal' | 'confirm-delete-researcher'|'confirm-delete-pos-graduate-program' | 'edit-graduate-program' | 'add-researcher-graduation' | 'add-researcher-csv' | 'add-student-graduation' | 'add-grupo-pesquisa' | 'filters' | 'pesquisadores-selecionados' | 'list-student-program' | 'add-researcher-graduation-two' | 'gratuate-program' | 'confirm-delete-researcher-graduate-program' | 'reset-peso-producoes' | 'confirm-delete-student-graduate-program' | 'import-bolsistas' | 'import-docentes' | 'import-taes'

interface ModalData {
  id?: string,
  name?: string,

  nome?: string;
  latitude?: number;
  longitude?: number;
  pesquisadores?: number;
  professores?: string[];


  doi?: string,
  qualis?: "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C" | "None" | "NP" | "SQ",
  title?: string,
  year?: string,
  jif?: string,
  jcr_link?: string
  lattes_10_id?: string,
  researcher_id?: string
  magazine?:string
  lattes_id?:string

  id_delete?: string

//program edit
graduate_program_id?: string
    code?: string

    area?: string
    modality?: string
    type?: string
    rating?: string
    institution_id?: string
    description?: string
    url_image?: string
    city?:string
    visible?: string
    qtd_discente?:string
    qtd_colaborador?:string
    qtd_permanente?:string
   
    type_reset?:string
 
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?:ModalData) => void;
  onClose: () => void;
  data: ModalData;
}

export const useModal = create<ModalStore>((set: any) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, newData = {}) => {
    // Merge os novos dados com os dados existentes
    const updatedData = { ...useModal.getState().data, ...newData };
    set({ isOpen: true, type, data: updatedData });
  },
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));
