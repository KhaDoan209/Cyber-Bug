import { getAllPriorityService } from '../../services/ProjectService/priorityService';

export const getAllPriorityAction = () => {
   return async (dispatch) => {
      try {
         let result = await getAllPriorityService();
      } catch (error) {
         console.log(error);
      }
   };
};
