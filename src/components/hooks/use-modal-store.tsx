
import { create } from "zustand";

export type ModalType = "search" | "add-graduate-program" | "cookies" | "map-researchers-modal"

interface ModalData {
  among?: number,
  articles?: number,
  book?: number,
  book_chapters?: number,
  id?: string,
  name?: string,
  university?: string,
  lattes_id?: string,
  area?: string,
  lattes_10_id?: string,
  abstract?: string,
  city?: string,
  orcid?: string,
  image?: string
  graduation?: string,
  patent?: string,
  software?: string,
  brand?: string,
  lattes_update?: Date,
}


interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
  data: ModalData;
}

export const useModal = create<ModalStore>((set:any) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));