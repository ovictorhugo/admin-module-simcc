
import { create } from "zustand";

export type ModalType = "search" | "add-graduate-program" | "cookies" | "map-researchers-modal" | 'researcher-modal'

interface ModalData {
  id?: string,
  name?: string,

  nome?: string;
  latitude?: number;
  longitude?: number;
  pesquisadores?: number;
  professores?: string[];
 
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?:ModalData) => void;
  onClose: () => void;
  data: ModalData;
}

export const useModal = create<ModalStore>((set:any) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
  
}));