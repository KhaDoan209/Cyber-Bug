import { getProjectCategoryService } from '../../services/ProjectService/categoryService';

export const getProjectCategoryACtion = () => {
   return async (dispatch) => {
      try {
         let result = await getProjectCategoryService();
      } catch (error) {
         console.log(error);
      }
   };
};
