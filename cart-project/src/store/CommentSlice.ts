import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CommentState = {
  showComments: boolean;
  productId: string;
};

const initialState: CommentState = {
  showComments: false,
  productId: '',
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentQuery(state, action: PayloadAction<string>) {
      state.productId = action.payload;
      state.showComments = true;

    },
    clearCommentQuery(state) {
      state.productId = '';
      state.showComments = false;
    },
  },
});

export const { setCommentQuery, clearCommentQuery } = commentSlice.actions;


