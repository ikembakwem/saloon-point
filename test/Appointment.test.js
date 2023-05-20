import React from "react";
import ReactDOM from "react-dom/client";
import { Appointment } from "../src/Appointment";
import { act } from "react-dom/test-utils";

describe("Appointment", () => {
  let container;

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  it("renders the customer's first name", () => {
    const customer = { firstName: "Nathan" };
    const component = <Appointment customer={customer} />;

    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain("Nathan");
  });

  it("renders the customer's first name", () => {
    const customer = { firstName: "Peter" };
    const component = <Appointment customer={customer} />;

    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain("Peter");
  });
});
