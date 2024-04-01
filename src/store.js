import { create } from "zustand";

const store = (set) => ({
  tasks: [{ id: 1, title: "TestTask", state: "PLANNED" }],
  draggedTask: null,
  addTask: (title, state, id) =>
    set((store) => ({ tasks: [...store.tasks, { title, state, id }] })),
  deleteTask: (id) =>
    set((store) => ({ tasks: store.tasks.filter((task) => task.id !== id) })),
  setDraggedTask: (id) => set({ draggedTask: id }),
  moveTask: (id, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.id === id ? { ...task, state } : task
      ),
    })),
});

export const useStore = create(store);
