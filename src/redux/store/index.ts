import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './root-reducer';

const store: Store<any, AnyAction> = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        })
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch: any = () => useAppDispatch();

export type RootState = ReturnType<typeof store.getState>

export { store, persistor, dispatch, useSelector, useDispatch };
