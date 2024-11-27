import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store";

type DispatchFuntion = () => AppDispatch;

export const useCartDispatch: DispatchFuntion = useDispatch;
export const useSearchDispatch: DispatchFuntion = useDispatch;
export const useCommentDispatch: DispatchFuntion = useDispatch;

export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useSearchSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCommentSelector: TypedUseSelectorHook<RootState> = useSelector;

