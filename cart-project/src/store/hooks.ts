import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
  } from 'react-redux'
  
  import { AppDispatch, RootState } from './store'
  
  type DispatchFuntion = () => AppDispatch
  
  export const useCartDispatch: DispatchFuntion = useDispatch
  export const useRatingDispatch: DispatchFuntion = useDispatch

  export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector
  export const useRatingSelector: TypedUseSelectorHook<RootState> = useSelector
  