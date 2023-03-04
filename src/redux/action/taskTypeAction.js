import { getAllTaskTypeService } from '../../services/ProjectService/taskTypeService';

export const getAllTaskTypeAction = () => {
   return async (dispatch) => {
      try {
         let result = getAllTaskTypeService();
      } catch (error) {
         console.log(error);
      }
   };
};
