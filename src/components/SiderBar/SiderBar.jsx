import React from 'react';
import { Fragment } from 'react';
import {
   PieChartOutlined,
   UserOutlined,
   DesktopOutlined,
   LogoutOutlined,
   UnorderedListOutlined,
   ProfileOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { open_drawer_create_task } from '../../redux/reducer/drawerHOCReducer';
import jira from '../../assets/img/jira.png';
import { Button, Modal } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { logOutAction } from '../../redux/action/userAction';
function getItem(label, key, icon, children) {
   return {
      key,
      icon,
      children,
      label,
   };
}

const SiderBar = () => {
   const { Sider } = Layout;
   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => {
      setIsModalOpen(true);
   };
   const handleOnLogOut = () => {
      setTimeout(() => {
         dispatch(logOutAction());
      }, 300);
      setIsModalOpen(false);
   };
   const handleCancel = () => {
      setIsModalOpen(false);
   };
   const dispatch = useDispatch();
   const items = [
      getItem(<NavLink to='/'>Dashboard</NavLink>, '1', <PieChartOutlined />),
      getItem(
         <div
            onClick={() => {
               dispatch(open_drawer_create_task());
            }}
         >
            Create Task
         </div>,
         '2',
         <DesktopOutlined />
      ),
      getItem('User', 'sub1', <UserOutlined />, [
         getItem(
            <NavLink
               className='p-0 nav-link'
               to='/userdashboard'
            >
               All user
            </NavLink>,
            '3',
            <UnorderedListOutlined />
         ),
         getItem(
            <NavLink
               className='p-0 nav-link'
               to='/profile'
            >
               Your profile
            </NavLink>,
            '4',
            <ProfileOutlined />
         ),
      ]),
      getItem(
         <div onClick={showModal}>Log out</div>,
         '',
         <LogoutOutlined onClick={showModal} />
      ),
   ];

   const [collapsed, setCollapsed] = useState(false);

   return (
      <>
         <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
         >
            <Modal
               centered={true}
               title='Do you want to log out ?'
               open={isModalOpen}
               onOk={handleOnLogOut}
               onCancel={handleCancel}
            ></Modal>
            <div
               style={{
                  height: 60,
                  margin: 10,
                  backgroundImage: `url(${jira})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
               }}
            />
            <Menu
               theme='dark'
               defaultSelectedKeys={['1']}
               mode='inline'
               items={items}
            />
         </Sider>
      </>
   );
};

export default SiderBar;
