// Importazione delle funzioni necessarie da reduxjs/toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Importazione del reducer utente
import userReducer from "./user/userSlice";
// Importazione delle funzioni per la persistenza dello store
import { persistReducer, persistStore } from "redux-persist";
// Importazione del meccanismo di memorizzazione predefinito
import storage from "redux-persist/lib/storage";

// Combinazione dei reducer in un unico oggetto rootReducer
const rootReducer = combineReducers({
  user: userReducer,
});

// Configurazione della persistenza dello store
const persistConfig = {
  key: "root", // Chiave per identificare lo store persistente
  storage, // Meccanismo di memorizzazione
  version: 1, // Versione dello schema dello store
};

// Creazione di un reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creazione dello store Redux utilizzando la libreria @reduxjs/toolkit
// Il reducer persistente viene passato come argomento
// Il middleware viene configurato per disabilitare il controllo di serializzabilità
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disabilita il controllo di serializzabilità
    }),
});

// Creazione di un oggetto persistor per la persistenza dello store
export const persistor = persistStore(store);
