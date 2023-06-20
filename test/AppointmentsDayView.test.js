/* eslint-disable no-undef */
import React from "react";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import { initializeContainer, render, click } from "./reactTestExtensions";

describe("Appointment", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };
  beforeEach(() => {
    initializeContainer();
  });

  const appointmentTable = () =>
    document.querySelector("#appointmentView > table");

  it("renders a table", () => {
    render(<Appointment customer={blankCustomer} />);
    expect(appointmentTable()).not.toBeNull();
  });

  it("renders the customer's first name", () => {
    const customer = { firstName: "Nathan" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("Nathan");
  });

  it("renders another customer's first name", () => {
    const customer = { firstName: "Peter" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("Peter");
  });

  it("renders customer last name", () => {
    const customer = { lastName: "Mbakwem" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("Mbakwem");
  });

  it("renders another customer last name", () => {
    const customer = { lastName: "Mmoneke" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("Mmoneke");
  });

  it("renders the customer phone number", () => {
    const customer = { phoneNumber: "08130794172" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("08130794172");
  });

  it("renders another customer phone number", () => {
    const customer = { phoneNumber: "08039326647" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("08039326647");
  });

  it("renders the stylist name", () => {
    render(<Appointment customer={blankCustomer} stylist="Shege" />);
    expect(appointmentTable()).toContainText("Shege");
  });

  it("renders the salon service", () => {
    render(<Appointment customer={blankCustomer} service="Cut" />);
    expect(appointmentTable()).toContainText("Cut");
  });

  it("renders another salon service", () => {
    render(<Appointment customer={blankCustomer} service="Retouch" />);
    expect(appointmentTable()).toContainText("Retouch");
  });

  it("renders the appointment notes", () => {
    render(
      <Appointment customer={blankCustomer} notes="Very friendly client" />
    );
    expect(appointmentTable()).toContainText("Very friendly client");
  });

  it("renders other appointment notes", () => {
    render(
      <Appointment customer={blankCustomer} notes="Client has allergies" />
    );
    expect(appointmentTable()).toContainText("Client has allergies");
  });

  it("renders an h3 element", () => {
    render(<Appointment customer={blankCustomer} />);
    expect(document.querySelector("h3")).not.toBeNull();
  });

  it("renders the time as the heading", () => {
    const today = new Date();
    const timestamp = today.setHours(9, 0, 0);
    render(<Appointment customer={blankCustomer} startsAt={timestamp} />);
    expect(document.querySelector("h3")).toContainText(
      "Today's appointment at 09:00"
    );
  });
});

describe("AppointmentsDayView", () => {
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Nathan" } },
    { startsAt: today.setHours(14, 0), customer: { firstName: "Peter" } },
  ];

  beforeEach(() => {
    initializeContainer();
  });

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

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0]).toContainText("12:00");
    expect(listChildren[1]).toContainText("14:00");
  });

  it("initially displays a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(document.body).toContainText("Nathan");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toContain("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const buttonTwo = document.querySelectorAll("button")[1];
    click(buttonTwo);
    expect(document.body).toContainText("Peter");
  });

  it("adds toggled class to button when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const button = document.querySelectorAll("button")[1];
    click(button);
    expect(button.className).toContain("toggled");
  });

  it("does not add toggle class if button is not selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const button = document.querySelectorAll("button")[1];
    expect(button.className).not.toContain("toggled");
  });
});
