import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

export let container;

export const initializeContainer = () => {
  container = document.createElement("div");

  document.body.replaceChildren(container);
};

export const render = (component) =>
  act(() => createRoot(container).render(component));

export const click = (element) => act(() => element.click());
