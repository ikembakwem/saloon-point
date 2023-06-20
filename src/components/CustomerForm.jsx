import React from "react";

export const CustomerForm = ({
  original,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(original);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        value={original.firstName}
        id="firstName"
        readOnly
      />

      <input type="submit" value="Add" />
    </form>
  );
};
