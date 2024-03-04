import { configureStore } from "@reduxjs/toolkit";
import sessionStore, { SessionState } from "./session.store";

export interface RootState {
  session: SessionState
}

const store = configureStore({
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware({
      serializableCheck: false
    }
  ),
  reducer: {
    session: sessionStore,
  },
})

export default store;
