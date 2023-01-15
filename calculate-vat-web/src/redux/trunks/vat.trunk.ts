import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getVats = createAsyncThunk("get/vat", async () => {
  const response = await client.get("/api/vat");
  return response.data;
});
