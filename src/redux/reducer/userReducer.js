import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   allUser: [],
   listUserFromProject: [],
   listUser: [],
   userDetail: {},
};

const userReducer = createSlice({
   name: 'userReducer',
   initialState,
   reducers: {
      getAllUserReducer: (state, action) => {
         state.allUser = action.payload;
      },
      getUserFromProject: (state, action) => {
         state.listUserFromProject = action.payload;
      },
      getListUserReducer: (state, action) => {
         state.listUser = action.payload;
      },
      getUserDetailReducer: (state, action) => {
         state.userDetail = action.payload[0];
      },

   },
});

export const {
   getAllUserReducer,
   getUserFromProject,
   getListUserReducer,
   getUserDetailReducer,
} = userReducer.actions;

export default userReducer.reducer;
