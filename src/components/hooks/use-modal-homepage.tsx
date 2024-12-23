import { create } from "zustand";

export type ModalType = "initial-home" | "maria-home" | "result-home" | 'graduation-home' | 'baremas'| 'meus-baremas' | 'procurar-baremas' | 'result-procurar-baremas' | 'dicionario' |'indicadores' | 'producoes-recentes' | 'informacoes' | 'grupos-pesquisa' | 'departamentos' | 'pesquisador' |'maria' | 'pesquisadores' | 'docentes-tecnicos' | 'paines-dados-externos'


interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModalHomepage = create<ModalStore>((set:any) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type: any) => set({ isOpen: true, type}),
  onClose: () => set({ type: null, isOpen: false })
}));