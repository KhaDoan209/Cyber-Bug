import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Space, Table } from 'antd';
import { Modal } from 'antd';
import {
   deleteUserAction,
   editUserAction,
   getListUserAction,
   getUserDetailAction,
} from '../../redux/action/userAction';
import { Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
const UserDashboard = () => {
   const [updateModalOpen, setUpdateModalOpen] = useState(false);
   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
   const pass = useRef();
   const confirmPass = useRef();
   const dispatch = useDispatch();
   const listUser = useSelector((state) => state.userReducer.listUser);
   const userDetail = useSelector((state) => state.userReducer.userDetail);
   let { email, name, phoneNumber, userId } = userDetail;

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         email: email,
         password: '',
         id: userId,
         name: name,
         phoneNumber: phoneNumber,
      },
      onSubmit: (values) => {
         if (pass.current.value === confirmPass.current.value) {
            dispatch(editUserAction(values));
            setUpdateModalOpen(false);
         } else {
            alert('Password does not match');
         }
      },
   });
   useEffect(() => {
      dispatch(getListUserAction());
   }, []);
   const columns = [
      {
         title: 'Id',
         dataIndex: 'stt',
         key: 'stt',
         sorter: (a, b) => a.stt - b.stt,
         sortDirections: ['descend'],
      },
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
         render: (text) => <a>{text}</a>,
         sorter: (a, b) => a.name.length - b.name.length,
         sortDirections: ['descend'],
      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
      },
      {
         title: 'Phone Number',
         dataIndex: 'phoneNumber',
         key: 'phoneNumber',
      },
      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <Space size='middle'>
               <Button
                  ghost
                  className='d-flex'
                  type='primary'
                  onClick={() => {
                     getUserDetailToUpdate(record.userId);
                  }}
               >
                  <EditOutlined className='my-1 pb-1' />
               </Button>
               <Button
                  ghost
                  className='d-flex'
                  type='primary'
                  danger
                  onClick={() => {
                     getUserDetailToDelete(record.userId);
                  }}
               >
                  <DeleteOutlined className='my-1 pb-1' />
               </Button>
            </Space>
         ),
      },
   ];
   const renderData = () => {
      if (listUser.length > 0) {
         let id = 1;
         let array = [];
         listUser.map((item) => {
            let object = {
               stt: id,
               key: id,
               userId: item.userId,
               name: item.name,
               email: item.email,
               phoneNumber: item.phoneNumber,
            };
            array.push(object);
            id++;
         });
         return array;
      }
   };
   const data = renderData();
   const getUserDetailToUpdate = (id) => {
      dispatch(getUserDetailAction(id));
      setUpdateModalOpen(!updateModalOpen);
   };
   const getUserDetailToDelete = (id) => {
      dispatch(getUserDetailAction(id));
      setDeleteModalOpen(!updateModalOpen);
   };
   const handleOnUpdate = () => {
      formik.handleSubmit();
   };
   const handleOnDelete = (id) => {
      dispatch(deleteUserAction(id));
      setDeleteModalOpen(false);
   };
   return (
      <div className='w-100'>
         <Modal
            title='Edit user'
            centered={true}
            closable={true}
            open={updateModalOpen}
            onCancel={() => {
               setUpdateModalOpen(false);
            }}
            footer={[
               <Button
                  key='back'
                  onClick={() => {
                     setUpdateModalOpen(false);
                  }}
               >
                  Cancel
               </Button>,
               <Button
                  key='submit'
                  type='primary'
                  onClick={handleOnUpdate}
               >
                  Update
               </Button>,
            ]}
            width={600}
         >
            <div className='mx-4 mt-4'>
               <form>
                  <div className='form-group'>
                     <label>Id</label>
                     <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={true}
                        defaultValue={formik.initialValues.id}
                        type='text'
                        className='form-control form-control-sm'
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
                        className='form-control form-control-sm'
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
                        className='form-control form-control-sm'
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
                        className='form-control form-control-sm'
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
                        className='form-control form-control-sm'
                     />
                  </div>
                  <div className='form-group'>
                     <label>Confirm Password</label>
                     <input
                        ref={confirmPass}
                        name='password'
                        type='text'
                        className='form-control form-control-sm'
                     />
                  </div>
               </form>
            </div>
         </Modal>
         <Modal
            title='Edit user'
            centered={true}
            closable={true}
            open={deleteModalOpen}
            onCancel={() => {
               setDeleteModalOpen(false);
            }}
            footer={[
               <Button
                  key='back'
                  onClick={() => {
                     setDeleteModalOpen(false);
                  }}
               >
                  Cancel
               </Button>,
               <Button
                  danger
                  key='submit'
                  type='primary'
                  onClick={() => {
                     handleOnDelete(userDetail.userId);
                  }}
               >
                  Delete
               </Button>,
            ]}
            width={600}
         >
            Do you want to delete user ?
         </Modal>
         <Table
            pagination={{ defaultPageSize: 8 }}
            columns={columns}
            dataSource={data}
         />
      </div>
   );
};

export default UserDashboard;
