import { Breed } from 'common';
import { api } from '../utils/api';
import { addBreed, setBreeds, setLoading, setRequestError } from '../slices/breedsSlice';
import { AsyncAction } from '../store';

// Async Redux-Thunk action
export const addBreedAsync: AsyncAction<Breed | null> = (breed: Breed) => {
    return async dispatch => {
        try {
            dispatch(setLoading());

            const addedBreed = await api<Breed>('post', 'api/breeds/', breed);
            return dispatch(addBreed(addedBreed)).payload;
        } catch (error) {
            dispatch(setRequestError(error));
            return null;
        }
    };
};

export const getBreedsAsync: AsyncAction<Breed[] | null> = (breed: Breed) => {
    return async dispatch => {
        try {
            dispatch(setLoading());

            const breeds = await api<Breed[]>('get', 'api/breeds/');
            return dispatch(setBreeds(breeds)).payload;
        } catch (error) {
            dispatch(setRequestError(error));
            return null;
        }
    };
};
