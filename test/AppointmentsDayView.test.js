import React from "react";
import { createRoot } from "react-dom/client";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import { act } from "react-dom/test-utils";

describe("Appointment", () => {
  let container;

  const render = (component) =>
    act(() => createRoot(container).render(component));

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

describe("AppointmentsDayView", () => {
  let container;
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Nathan" } },
    { startsAt: today.setHours(14, 0), customer: { firstName: "Peter" } },
  ];

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => createRoot(container).render(component));

  it("renders a div with the correct id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });

  it("it renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("14:00");
  });

  it("initially displays a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(document.body.textContent).toContain("Nathan");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const buttonTwo = document.querySelectorAll("button")[1];
    act(() => buttonTwo.click());
    expect(document.body.textContent).toContain("Peter");
  });
});
