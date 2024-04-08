
import { create } from "zustand";

export type ModalType = "filter" | ""


interface ModalStore {
  type: ModalType | null;
  isOpenSidebar: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModalSidebar = create<ModalStore>((set:any) => ({
  type: null,
  data: {},
  isOpenSidebar: false,
  onOpen: (type: any) => set({ isOpen: true, type}),
  onClose: () => set({ type: null, isOpen: false })
}));