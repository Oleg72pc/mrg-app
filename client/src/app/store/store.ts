import { configureStore } from '@reduxjs/toolkit'
import mrgReducer from 'entities/mrg/model/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore( {
    reducer: {mrg: mrgReducer,},
    middleware: ( getDefaultMiddleware ) =>
        getDefaultMiddleware().concat(
        ),
} )

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()