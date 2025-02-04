import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredContacts = createSelector(
  [(state) => state.contacts.items || [], (state) => state.filters.name || ""],
  (items, filter) =>
    items.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);
