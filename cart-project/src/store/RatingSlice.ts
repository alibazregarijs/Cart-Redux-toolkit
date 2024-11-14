import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';


export type Rating = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
};

type RatingState = {
  items: Rating[]
}

const initialState: RatingState = {
  items: [],
}



export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    AddRating(state,action: PayloadAction<{ id: string, userId: string, productId: string, rating: number }>) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
  
      if (itemIndex >= 0) {
        state.items[itemIndex].rating = action.payload.rating
      } else {
        state.items.push(action.payload)

      }
    },
  },
})

export const { AddRating } = ratingSlice.actions
