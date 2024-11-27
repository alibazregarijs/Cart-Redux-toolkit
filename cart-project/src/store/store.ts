import { configureStore } from '@reduxjs/toolkit'

import { cartSlice } from './CartSlice'
import { searchSlice } from "./SearchSlice";
import { commentSlice } from "./CommentSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    search: searchSlice.reducer,
    comment: commentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
