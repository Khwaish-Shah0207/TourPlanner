import { create } from "zustand";

interface StoreState {
  tripId: string | null;
  setTripId: (id: string | null) => void;

  modal: "add" | "edit" | null;
  editingTask: any | null;
  prefillDate: string | null;

  openAdd: (date: string | null) => void;
  openEdit: (task: any) => void;
  closeModal: () => void;
}

export const useStore = create<StoreState>((set) => ({
  tripId: null,

  setTripId: (id) => set({ tripId: id }),

  modal: null,
  editingTask: null,
  prefillDate: null,

  openAdd: (date) =>
    set({
      modal: "add",
      editingTask: null,
      prefillDate: date,
    }),

  openEdit: (task) =>
    set({
      modal: "edit",
      editingTask: task,
      prefillDate: null,
    }),

  closeModal: () =>
    set({
      modal: null,
      editingTask: null,
      prefillDate: null,
    }),
}));