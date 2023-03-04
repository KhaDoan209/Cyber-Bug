import { getAllStatusService } from '../../services/ProjectService/statusService';

export const getAllStatusAction = () => {
   return async (dispatch) => {
      try {
         let result = getAllStatusService();
      } catch (error) {
         console.log(error);
      }
   };
};
