//In questo codice JavaScript, si sta utilizzando la libreria Redux Toolkit per creare un slice di stato per la gestione dell'utente. Lo slice è denominato 'user' e include tre azioni: signInStart, signInSuccess, e signInFail.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    console: null,
    loading:false,
}

const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    // L'azione signInStart imposta lo stato loading a true e error a null
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // L'azione signInSuccess imposta lo stato currentUser con i dati dell'utente passati come payload, imposta loading a false, e error a null.
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    //L'azione signInFail imposta loading a false e error con i dati dell'errore passati come payload.
    signInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});


//Le azioni signInFail, signInSuccess, e signInStart sono esportate per essere utilizzate altrove nel codice. 
export const { signInStart, signInSuccess, signInFail } = userSlices.actions;

// il reducer creato dallo slice è esportato per essere combinato con gli altri reducer nella configurazione di Redux
export default userSlices.reducer;