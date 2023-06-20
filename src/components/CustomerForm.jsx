import React, { useState } from "react";

export const CustomerForm = ({
  original,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState(original);

  const handleFirstNameChange = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      firstName: target.value,
    }));

  const handleLastNameChange = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      lastName: target.value,
    }));
  const handlePhoneNumberChange = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      phoneNumber: target.value,
    }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(customer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        value={customer.firstName}
        id="firstName"
        onChange={handleFirstNameChange}
      />

      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={handleLastNameChange}
        value={customer.lastName}
      />

      <label htmlFor="phoneNumber">Phone number</label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={customer.phoneNumber}
        onChange={handlePhoneNumberChange}
      />

      <input type="submit" value="Add" />
    </form>
  );
};
