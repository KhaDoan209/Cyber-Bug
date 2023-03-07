import { http } from '../../services/interceptor';
import {
   assignUserProjectService,
   createProjectAuthorizeService,
   createProjectService,
   getAllProjectService,
   getProjectDetailService,
   getTaskDetailService,
   assignUserTaskService,
   removeUserFromTaskService,
   removeUserFromProjectService,
   createTaskService,
   updateTaskService,
   updateProjectService,
   updateStatusService,
   updatePriorityService,
   updateDescriptionService,
   updateTimeTrackingService,
   updateEstimateService,
   deleteProjectService,
   deleteTaskService,
} from '../../services/ProjectService/projectService';
import { notifiFunction } from '../../utils/Notification/notification';
import { get_list_project } from '../reducer/projectReducer';

export const getAllProjectAction = () => {
   return async (dispatch) => {
      try {
         let result = await getAllProjectService();
         // console.log('data',result);
         await dispatch(get_list_project(result));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getProjectDetailAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await getProjectDetailService(id);
         console.log(result);
      } catch (error) {
         console.log(error);
      }
   };
};

export const getTaskDetailAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await getTaskDetailService(id);
      } catch (error) {
         console.log(error);
      }
   };
};

export const createProjectAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await createProjectService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const createProjectAuthorizeAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await createProjectAuthorizeService(data);
         await dispatch(getAllProjectAction());
         notifiFunction('success', 'Add Project thành công nha !');
      } catch (error) {
         console.log(error);
      }
   };
};

export const assignUserProjectAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await assignUserProjectService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const assignUserTaskAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await assignUserTaskService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const removeUserFromTaskAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await removeUserFromTaskService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const removeUserFromProjectAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await removeUserFromProjectService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const createTaskAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await createTaskService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateTaskAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await updateTaskService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateProjectAction = (id, data) => {
   return async (dispatch) => {
      try {
         let result = await updateProjectService(id, data);
         notifiFunction('success', 'Edit thành công nha !');
      } catch (error) {
         console.log(error);
         if (error.statusCode === 403) {
            notifiFunction('error', 'Project không phải của bạn đâu đừng update, nhiều bạn phàn nàn lắm đó !');
         }
      }
   };
};

export const updateStatusAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await updateStatusService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const updatePriorityAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await updatePriorityService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateDescriptionAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await updateDescriptionService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateTimeTrackingAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await updateTimeTrackingService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateEstimateAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await updateEstimateService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const deleteProjectAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await deleteProjectService(id);
         await dispatch(getAllProjectAction())
         notifiFunction('success', 'Delete thành công nha !');
      } catch (error) {
         console.log(error);
         if (error.statusCode === 403) {
            notifiFunction('error', 'Project không phải của bạn đâu đừng delete, nhiều bạn phàn nàn lắm đó !');
         }
      }
   };
};

export const deleteTaskAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await deleteTaskService(id);
      } catch (error) {
         console.log(error);
      }
   };
};
