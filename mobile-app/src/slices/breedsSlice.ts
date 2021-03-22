import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Breed } from 'common';

interface BreedsState {
    list: Breed[];
    loading: boolean;
    error: string | null;
}

const initialState: BreedsState = {
    list: [],
    loading: false,
    error: null,
};

export const breedsSlice = createSlice({
    name: 'breeds',
    initialState,
    reducers: {
        setLoading: state => {
            state.loading = true;
        },
        addBreed: (state, action: PayloadAction<Breed>) => {
            state.list.push(action.payload);
            state.error = null;
            state.loading = false;
        },
        setBreeds: (state, action: PayloadAction<Breed[]>) => {
            state.list = action.payload;
            state.error = null;
            state.loading = false;
        },
        setRequestError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

// Actions
export const { addBreed, setBreeds, setLoading, setRequestError } = breedsSlice.actions;
export default breedsSlice;

// Selectors
export const selectBreeds = (state: RootState) => state.breeds.list;
