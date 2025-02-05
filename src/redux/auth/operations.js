import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

export const setAuthHeader = (token) => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("/users/signup", credentials);
      setAuthHeader(data.token);
      toast.success(`Welcome, ${data.user.name}! Registration successful.`);
      return data;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Email already exists or invalid data. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("/users/login", credentials);
      setAuthHeader(data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const { data } = await goitApi.post("/users/logout");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (!savedToken) {
      return thunkApi.rejectWithValue("token is not exist");
    }
    setAuthHeader(savedToken);

    try {
      const { data } = await goitApi.get("users/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
