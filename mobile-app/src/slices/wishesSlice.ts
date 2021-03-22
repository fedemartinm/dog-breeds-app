import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Breed } from 'common';
import { RootState } from '../store';

const initialState: Breed[] = [];

export const wishesSlice = createSlice({
    name: 'wishes',
    initialState,
    reducers: {
        addWish: (state, action: PayloadAction<Breed>) => {
            if (state.some(wish => wish.id === action.payload.id)) {
                return state;
            } else {
                state.push(action.payload);
            }
        },
        removeWish: (state, action: PayloadAction<Breed>) => {
            return state.filter(wish => wish.id !== action.payload.id);
        },
    },
});

// Actions
export const { addWish, removeWish } = wishesSlice.actions;
export default wishesSlice;

// Selectors
export const selectWishes = (state: RootState) => state.wishes;
