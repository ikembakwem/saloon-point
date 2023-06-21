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
  const blankCustomer = { firstName: "" };

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

    it(`renders '${text}' as the first name label content`, () => {
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
    it("saves existing first name ", () => {
      expect.hasAssertions();

      const customer = { firstName: value };

      render(
        <CustomerForm
          original={customer}
          onSubmit={({ firstName }) =>
            expect(firstName).toEqual(value)
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
          onSubmit={({ firstName }) =>
            expect(firstName).toEqual(value)
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
