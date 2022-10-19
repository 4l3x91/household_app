import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth/react-native";
import { auth } from "../../config/firebase";
import { User as StateUser } from "./userModel";
import { initialState } from "./userState";

export const createUser = createAsyncThunk<UserCredential, { email: string; password: string }, { rejectValue: string }>(
  "user/createUser",
  async ({ email, password }, thunkAPI) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return thunkAPI.rejectWithValue("Error setting user");
    }
  }
);

export const signInUser = createAsyncThunk<UserCredential, { email: string; password: string }, { rejectValue: string }>(
  "user/signInUser",
  async ({ email, password }, thunkAPI) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Error logging in user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<StateUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //createUser cases
    builder.addCase(createUser.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.pending = false;
      state.user = { id: action.payload.user.uid, email: action.payload.user.email };
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error setting user";
    });

    //signIn cases
    builder.addCase(signInUser.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.pending = false;
      state.user = { id: action.payload.user.uid, email: action.payload.user.email };
      console.log(auth);
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error signing in user";
    });
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
