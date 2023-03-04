import {
   getAllUserService,
   signInService,
   signUpService,
   getUserByProjectIdService,
   editUserService,
   deleteUserService,
} from '../../services/ProjectService/userService';
import { getAllUserReducer } from '../reducer/userReducer';

export const signUpAction = (accountToSignUp) => {
   return async (dispatch) => {
      try {
         const result = await signUpService(accountToSignUp);
      } catch (error) {
         console.log(error);
      }
   };
};

export const signInAction = (accountToSignIn) => {
   return async (dispatch) => {
      try {
         const result = await signInService(accountToSignIn);
      } catch (error) {
         console.log(error);
      }
   };
};

export const getAllUserAction = () => {
   return async (dispatch) => {
      try {
         const result = await getAllUserService();
         dispatch(getAllUserReducer(result));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getUserByProjectIdAction = (id) => {
   return async (dispatch) => {
      try {
         const result = await getUserByProjectIdService(id);
      } catch (error) {
         console.log(error);
      }
   };
};

export const editUserAction = (infor) => {
   return async (dispatch) => {
      try {
         const result = await editUserService(infor);
      } catch (error) {
         console.log(error);
      }
   };
};

export const deleteUserAction = (id) => {
   return async (dispatch) => {
      try {
         const result = await deleteUserService(id);
      } catch (error) {
         console.log(error);
      }
   };
};
