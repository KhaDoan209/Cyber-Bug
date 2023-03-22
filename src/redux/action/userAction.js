import {
   getAllUserService,
   signInService,
   signUpService,
   getUserByProjectIdService,
   editUserService,
   deleteUserService,
   getListUserService,
   getUserDetailService,
} from '../../services/ProjectService/userService';
import { ACCESS_TOKEN, USER_LOGIN } from '../../utils/settings';
import {
   getAllUserReducer,
   getListUserReducer,
   getUserDetailReducer,
   getUserFromProject,
} from '../reducer/userReducer';
import { history } from '../../App';
import { notifiFunction } from '../../utils/Notification/notification';

export const signUpAction = (accountToSignUp) => {
   return async (dispatch) => {
      try {
         const result = await signUpService(accountToSignUp);
         notifiFunction('success', 'Register thành công !');
         history.push('/login');
      } catch (error) {
         console.log(error);
         notifiFunction('error', 'Email đã được sử dụng !');
      }
   };
};

export const signInAction = (accountToSignIn) => {
   return async (dispatch) => {
      try {
         const result = await signInService(accountToSignIn);
         localStorage.setItem(ACCESS_TOKEN, result.accessToken);
         localStorage.setItem(USER_LOGIN, JSON.stringify(result));

         history.push('/');
      } catch (error) {
         console.log(error);
      }
   };
};

export const logOutAction = () => {
   return async () => {
      try {
         localStorage.removeItem('signedInAccount');
         localStorage.removeItem('ACCESS_TOKEN');
         history.replace('/login');
      } catch (error) {
         console.log(error);
      }
   };
};
export const getAllUserAction = (keyword) => {
   return async (dispatch) => {
      try {
         const result = await getAllUserService(keyword);
         dispatch(getAllUserReducer(result));
      } catch (error) {
         console.log(error);
      }
   };
};
export const getListUserAction = () => {
   return async (dispatch) => {
      try {
         const result = await getListUserService();
         dispatch(getListUserReducer(result));
      } catch (error) {
         console.log(error);
      }
   };
};
export const getUserDetailAction = (keyword) => {
   return async (dispatch) => {
      try {
         const result = await getUserDetailService(keyword);
         dispatch(getUserDetailReducer(result));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getUserByProjectIdAction = (id) => {
   return async (dispatch) => {
      try {
         const result = await getUserByProjectIdService(id);
         console.log('arr', result);
         await dispatch(getUserFromProject(result));
      } catch (error) {
         console.log(error);
         if (error.statusCode === 404) {
            dispatch(getUserFromProject([]));
         }
      }
   };
};

export const editUserAction = (infor) => {
   return async (dispatch) => {
      try {
         await editUserService(infor);
         alert('Update successfully');
         const result = await getListUserService();
         dispatch(getListUserReducer(result));
      } catch (error) {
         console.log(error);
      }
   };
};

export const deleteUserAction = (id) => {
   return async (dispatch) => {
      try {
         await deleteUserService(id);
         alert('User removed successfully');
         const result = await getListUserService();
         dispatch(getListUserReducer(result));
      } catch (error) {
         alert(error.content);
      }
   };
};
