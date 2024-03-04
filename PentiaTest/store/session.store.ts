import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

interface State {
  email: string
  uid: string
  displayName: string
  verified: boolean
  photoURL: string
}

const initialState = {} as State;

const slice = createSlice({
  name: 'sessionStore',
  initialState,
  reducers: {
    setSession: (state, action: { type: string, payload: FirebaseAuthTypes.UserCredential }) => {
      state.email = action.payload.user.email || "";
      state.uid = action.payload.user.uid;
      state.displayName = action.payload.user.displayName || "";
      state.verified = action.payload.user.emailVerified;
      state.photoURL = action.payload.user.photoURL || "";
    },
    clearSession: (state) => state = initialState
  }
});

export type SessionState = ReturnType<typeof slice.reducer>;
export const { setSession, clearSession } = slice.actions;
export default slice.reducer;
