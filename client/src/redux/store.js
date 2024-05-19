import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

//makeStore che genera e esporta uno store Redux utilizzando la libreria @reduxjs/toolkit. La funzione configureStore viene importata da questa libreria, mentre il userReducer viene importato dal file './user/userSlice'.
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
