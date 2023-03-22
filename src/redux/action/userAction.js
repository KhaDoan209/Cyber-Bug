import {
   getAllUserService,
   signInService,
   signUpService,
   getUserByProjectIdService,
   editUserService,
   deleteUserService,
} from '../../services/ProjectService/userService';
import { ACCESS_TOKEN, USER_LOGIN } from '../../utils/settings';
import { getAllUserReducer } from '../reducer/userReducer';
import { history } from '../../App';

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
         console.log('data', result)
         // Lưu vào localStorage khi đăng nhập thành công
         localStorage.setItem(ACCESS_TOKEN, result.accessToken)
         localStorage.setItem(USER_LOGIN, JSON.stringify(result))
         
         history.push('/');
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
