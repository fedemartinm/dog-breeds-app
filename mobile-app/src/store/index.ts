import { Action, configureStore, AnyAction, ThunkAction, PayloadAction, ActionCreator } from '@reduxjs/toolkit';
import { Breed } from 'common';
import { Dispatch } from 'react';
import { createSelectorHook, createDispatchHook } from 'react-redux';

import breedsSlice from '../slices/breedsSlice';
import wishesSlice from '../slices/wishesSlice';

const store = configureStore({
    reducer: {
        breeds: breedsSlice.reducer,
        wishes: wishesSlice.reducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkResult<T> = ThunkAction<Promise<T>, RootState, {}, any>;
export type AsyncAction<T> = ActionCreator<ThunkResult<T>>;

type DispatchResult<T, Z = any> = T extends PayloadAction<any> ? T : T extends ThunkResult<Z> ? Promise<Z> : never;

export interface TypedDispatch<A = PayloadAction<any> | ThunkResult<any>> extends Dispatch<A> {
    <T extends A>(action: T): DispatchResult<T>;
}

export const useSelector = createSelectorHook<RootState>();
export const useDispatch: () => TypedDispatch = createDispatchHook<AppDispatch>();
