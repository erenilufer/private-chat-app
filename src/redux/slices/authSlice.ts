import { createSlice } from "@reduxjs/toolkit";
import { User as FirebaseUser } from "firebase/auth";

export interface AuthState {
  user: FirebaseUser | null;
  loadingState: "idle" | "loading" | "success" | "error";
  error: any;
}

const initialState: AuthState = {
  user: null,
  loadingState: "idle",
  error: false,
};

export const authState = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = authState.actions;

export default authState.reducer;
