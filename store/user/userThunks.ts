import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../config/firebase";

export const postUser = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  "user/createUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      return userCredential.user.toJSON() as User;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Någontin gick fel vid skapandet av användare. Kontakta vår support om felet kvartstår.");
    }
  }
);

export const signInUser = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  "user/signInUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);

      return userCredentials.user.toJSON() as User;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Error logging in user");
    }
  }
);
