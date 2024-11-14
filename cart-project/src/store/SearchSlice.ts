import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
  query: string;
};

const initialState: SearchState = {
  query: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearSearchQuery(state) {
      state.query = '';
    },
  },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;


