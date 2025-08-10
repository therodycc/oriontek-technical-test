import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './root-reducer';

// Creamos el store
export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Persistencia
export const persistor = persistStore(store);

// Tipos derivados del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados
export const useDispatch: () => AppDispatch = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
