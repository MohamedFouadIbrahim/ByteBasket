import type { Product } from '@/features/home/types/Product';
import { createSlice } from '@reduxjs/toolkit';

type FavoritesType = {
  favorites:Array<Product>
};

const initialState: FavoritesType = {
    favorites: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const product = action.payload;
            const existingIndex = state.favorites.findIndex(
                (item) => item.id === product.id
            );

            if (existingIndex !== -1) {
                // Remove from favorites if it exists
                state.favorites.splice(existingIndex, 1);
            } else {
                // Add to favorites if it doesn't exist
                state.favorites.push(product);
            }
        },
        clearChache:(state) =>{
            state.favorites = []
        }
    },

});

export const { toggleFavorite } = favoritesSlice.actions;
export const { reducer: favoritesReducer  } =  favoritesSlice;