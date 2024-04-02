import { create } from "zustand";
import { produce } from "immer";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, state, id) =>
    set(
      produce((store) => {
        store.tasks.push({ title, state, id });
      }),
      false,
      "addTask"
    ),
  deleteTask: (id) =>
    set(
      (store) => ({ tasks: store.tasks.filter((task) => task.id !== id) }),
      false,
      "deleteTask"
    ),
  setDraggedTask: (id) => set({ draggedTask: id }, false, "setDraggedTask"),
  moveTask: (id, state) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.id === id ? { ...task, state } : task
        ),
      }),
      false,
      "moveTask"
    ),
});

export const useStore = create(persist(devtools(store), { name: "storage" }));
