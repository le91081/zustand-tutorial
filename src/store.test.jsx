import { expect } from "vitest";
import { test } from "vitest";
import { useStore } from "./store";
import { useEffect } from "react";
import { vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("zustand");

function TestComponent({ selector, effect }) {
  const items = useStore(selector);
  useEffect(() => effect(items), [items]);
  return null;
}

test("sample", () => {
  expect(1).toEqual(1);
});

test("should return default value at the start", () => {
  const selector = (store) => store.tasks;
  const effect = vi.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});

test("should add an items to the store and rerun the effect", () => {
  const selector = (store) => ({ tasks: store.tasks, addTask: store.addTask });
  const effect = vi.fn().mockImplementation((items) => {
    if (items.tasks.length === 0) {
      items.addTask("test", "todo", 1);
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({
      tasks: [{ title: "test", state: "todo", id: 1 }],
    })
  );
});

test("should add an items to the store and then delete it", () => {
  const selector = (store) => ({
    tasks: store.tasks,
    addTask: store.addTask,
    deleteTask: store.deleteTask,
  });

  let createdTask = false;
  let currentItems;
  const effect = vi.fn().mockImplementation((items) => {
    currentItems = items;
    if (!createdTask) {
      items.addTask("test", "todo", 1);
      createdTask = true;
    } else if (items.tasks.length === 1) {
      items.deleteTask(1);
    }
  });

  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(3);
  expect(currentItems.tasks).toEqual([]);
});
