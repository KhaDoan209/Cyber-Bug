import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import projectReducer from './reducer/projectReducer';
import commentReducer from './reducer/commentReducer';
import priorityReducer from './reducer/priorityReducer';
import projectCategoryReducer from './reducer/projectCategoryReducer';
import taskTypeReducer from './reducer/taskTypeReducer';
import statusReducer from './reducer/statusReducer';
export const store = configureStore({
   reducer: {
      userReducer,
      projectReducer,
      commentReducer,
      priorityReducer,
      projectCategoryReducer,
      taskTypeReducer,
      statusReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});
