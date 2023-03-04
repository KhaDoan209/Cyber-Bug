import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   listUser: [],
};

const userReducer = createSlice({
   name: 'userReducer',
   initialState,
   reducers: {
      getAllUserReducer: (state, action) => {
         state.listUser = action.payload;
      },
   },
});

export const { getAllUserReducer } = userReducer.actions;

export default userReducer.reducer;
