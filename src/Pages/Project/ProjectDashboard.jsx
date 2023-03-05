import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProjectAction } from '../../redux/action/projectAction';
const ProjectDashboard = () => {
   const dispatch = useDispatch();
   const projectList = useSelector((state) => state.projectReducer.projectList);
  
   useEffect(() => {
      dispatch(getAllProjectAction());
   }, []);

   return <div>ProjectDashboard</div>;
};

export default ProjectDashboard;
