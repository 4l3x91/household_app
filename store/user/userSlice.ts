import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import { User, UserCredential } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth/react-native";
import { auth } from "../../config/firebase";
import { User as StateUser } from "./userModel";
import { initialState } from "./userState";

export const createUser = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  "user/createUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Någontin gick fel vid skapandet av användare. Kontakta vår support om felet kvartstår.");
    }
  }
);

export const signInUser = createAsyncThunk<UserCredential, { email: string; password: string }, { rejectValue: string }>(
  "user/signInUser",
  async ({ email, password }, thunkAPI) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
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
    clearErrors(state){
      state.error = ""
    }
  },
  extraReducers: (builder) => {
    //createUser cases
    builder.addCase(createUser.pending, (state) => {
      state.pending = true;
      state.error = "";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.pending = false;
      state.user = { id: action.payload.uid, email: action.payload.email };
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
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error signing in user";
    });
  },
});

export const { login, logout, clearErrors } = userSlice.actions;
export const userReducer = userSlice.reducer;
