import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi } from "../auth/operations";
import { toast } from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await goitApi.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkAPI) => {
    try {
      const { data } = await goitApi.post("/contacts", body);
      toast.success("Contact successfully added!");
      return data;
    } catch (error) {
      toast.error("Failed to add contact!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    console.log("Deleting contact with ID:", id);
    try {
      const { data } = await goitApi.delete(`/contacts/${id}`);
      toast.success("Contact successfully deleted!");
      return data;
    } catch (error) {
      toast.error("Failed to delete contact!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
