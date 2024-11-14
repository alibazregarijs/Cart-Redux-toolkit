import { configureStore } from '@reduxjs/toolkit'

import { cartSlice } from './CartSlice'
import { ratingSlice } from './RatingSlice'
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    rating: ratingSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
