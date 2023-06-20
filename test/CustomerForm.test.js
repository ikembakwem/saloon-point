import React from "react";
import {
  initializeReactContainer,
  render,
  element,
  form,
  field,
  click,
  submit,
  submitButton,
  change,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/components/CustomerForm";

describe("CustomerForm", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  const itRendersAsATextBox = (fieldName) =>
    it("renders as a text box", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName).tagName).toEqual("INPUT");
      expect(field(fieldName).type).toEqual("text");
    });

  const itIncludesExistingValue = (
    fieldName,
    existing
  ) =>
    it("includes the existing value", () => {
      const customer = { [fieldName]: existing };

      render(<CustomerForm original={customer} />);

      expect(field(fieldName).value).toEqual(existing);
    });

  const itRendersALabel = (fieldName, text) => {
    it("renders a label", () => {
      render(<CustomerForm original={blankCustomer} />);

      const label = element(`label[for=${fieldName}]`);

      expect(label).not.toBeNull();
    });

    it(`renders '${text}' as the ${fieldName} label content`, () => {
      render(<CustomerForm original={blankCustomer} />);

      const label = element(`label[for=${fieldName}]`);

      expect(label).toContainText(text);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelFor = (
    fieldName
  ) =>
    it("assigns an id that matches the label's for attribute", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSavesExistingValue = (fieldName, value) =>
    it("saves existing value when submitted", () => {
      expect.hasAssertions();

      const customer = { [fieldName]: value };

      render(
        <CustomerForm
          original={customer}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );

      const button = element(fieldName);

      click(button);
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it("saves new value when submitted", () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          original={blankCustomer}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );

      change(field(fieldName), value);

      click(submitButton());
    });

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(form()).not.toBeNull();
  });

  describe("first name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesExistingValue("firstName", "Peter");
    itRendersALabel("firstName", "First name");
    itAssignsAnIdThatMatchesTheLabelFor("firstName");
    itSavesExistingValue("input[type=submit]", "Peter");
    itSubmitsNewValue("firstName", "Ikechukwu");
  });

  describe("last name field", () => {
    itRendersAsATextBox("lastName");
    itIncludesExistingValue("lastName", "Mbakwem");
    itRendersALabel("lastName", "Last name");
    itAssignsAnIdThatMatchesTheLabelFor("lastName");
    itSavesExistingValue(
      "input[type=submit]",
      "Mbakwem"
    );
    itSubmitsNewValue("lastName", "Ikechukwu");
  });

  describe("phone number field", () => {
    itRendersAsATextBox("phoneNumber");
    itIncludesExistingValue("phoneNumber", "Mbakwem");
    itRendersALabel("phoneNumber", "Phone number");
    itAssignsAnIdThatMatchesTheLabelFor("phoneNumber");
    itSavesExistingValue(
      "input[type=submit]",
      "08130794172"
    );
    itSubmitsNewValue("phoneNumber", "08130067300");
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(submitButton()).not.toBeNull();
  });

  it("prevents the default action when submitting the form", () => {
    render(
      <CustomerForm
        original={blankCustomer}
        onSubmit={() => {}}
      />
    );

    const event = submit(form());

    expect(event.defaultPrevented).toBe(true);
  });
});
