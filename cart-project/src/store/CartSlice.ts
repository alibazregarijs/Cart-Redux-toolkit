import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: string
  title: string
  price: number
  quantityInStore: number
  quantity: number
}

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state,action: PayloadAction<{ id: string; img:string ,quantity:number,title: string; price: number; quantityInStore: number }>) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
      
      if (itemIndex >= 0) {
        console.log(action.payload.quantity,'quantityyyyyyyyyy')
        if(state.items[itemIndex].quantityInStore >= action.payload.quantity){
          state.items[itemIndex].quantity++
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      )

      if (state.items[itemIndex].quantity === 1) {
        state.items.splice(itemIndex, 1)
      } else {
        state.items[itemIndex].quantity--
      }
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
