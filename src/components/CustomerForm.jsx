import React from "react";

export const CustomerForm = ({ original }) => (
  <form>
    <label htmlFor="firstName">First name</label>
    <input
      type="text"
      name="firstName"
      value={original.firstName}
      id="firstName"
      readOnly
    />
  </form>
);
