import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User as FirebaseUser } from "firebase/auth";

export interface AuthState {
  user: FirebaseUser | null;
  loadingState: "idle" | "loading" | "success" | "error";
  error: boolean;
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
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authState.actions;

export default authState.reducer;
