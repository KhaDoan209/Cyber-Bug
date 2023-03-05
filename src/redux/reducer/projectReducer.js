import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

const initialState = {
   projectList: [],
};

const projectReducer = createSlice({
   name: 'projectReducer',
   initialState,
   reducers: {
      getProjectList: (state, action) => {
         state.projectList = action.payload;
      },
   },
});

export const { getProjectList } = projectReducer.actions;

export default projectReducer.reducer;
