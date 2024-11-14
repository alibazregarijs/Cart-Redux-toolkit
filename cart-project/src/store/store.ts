import { configureStore } from '@reduxjs/toolkit'

import { cartSlice } from './CartSlice'
import { searchSlice } from './SearchSlice'
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    search: searchSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
