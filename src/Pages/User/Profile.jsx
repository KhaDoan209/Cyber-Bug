import React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { USER_LOGIN } from '../../utils/settings';
import {
   editUserAction,
   getUserDetailAction,
} from '../../redux/action/userAction';
import { useFormik } from 'formik';
const signedInUser = JSON.parse(localStorage.getItem(USER_LOGIN));

const Profile = () => {
   const dispatch = useDispatch();
   const pass = useRef();
   const confirmPass = useRef();
   const userProfile = useSelector((state) => state.userReducer.userDetail);
   useEffect(() => {
      dispatch(getUserDetailAction(signedInUser.id));
   }, []);
   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         email: userProfile.email,
         password: '',
         id: userProfile.userId,
         name: userProfile.name,
         phoneNumber: userProfile.phoneNumber,
      },
      onSubmit: (values) => {
         console.log(values);
         if (pass.current.value === confirmPass.current.value) {
            dispatch(editUserAction(values));
         } else {
            alert('Password does not match');
         }
      },
   });
   return (
      <div className='container'>
         <div className='row'>
            <div className='col-5'>
               <div className='w-75 mx-auto'>
                  <img
                     src={userProfile.avatar}
                     className='img-fluid avatar'
                  />
               </div>
            </div>
            <div className='col-7'>
               <form>
                  <div className='form-group'>
                     <label>Id</label>
                     <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={true}
                        defaultValue={formik.initialValues.id}
                        type='text'
                        className='form-control form-control-md'
                     />
                  </div>
                  <div className='form-group'>
                     <label>Email</label>
                     <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='email'
                        defaultValue={formik.initialValues.email}
                        type='email'
                        className='form-control form-control-md'
                     />
                  </div>
                  <div className='form-group'>
                     <label>Name</label>
                     <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='name'
                        defaultValue={formik.initialValues.name}
                        type='text'
                        className='form-control form-control-md'
                     />
                  </div>
                  <div className='form-group'>
                     <label>Phone Number</label>
                     <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='phoneNumber'
                        defaultValue={formik.initialValues.phoneNumber}
                        type='text'
                        className='form-control form-control-md'
                     />
                  </div>
                  <div className='form-group'>
                     <label>Password</label>
                     <input
                        ref={pass}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='password'
                        type='text'
                        className='form-control form-control-md'
                     />
                  </div>
                  <div className='form-group'>
                     <label>Confirm Password</label>
                     <input
                        ref={confirmPass}
                        name='password'
                        type='text'
                        className='form-control form-control-md'
                     />
                  </div>
                  <div className='form-group d-flex justify-content-end'>
                     <div
                        onClick={formik.handleSubmit}
                        className='btn btn-primary'
                     >
                        Update
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Profile;
