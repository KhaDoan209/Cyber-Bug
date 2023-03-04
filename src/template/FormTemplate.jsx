import React from 'react';
import { Route } from 'react-router-dom';
import imgForm from '../assets/img/login.jpg';
const FormTemplate = (props) => {
   return (
      <Route
         exact
         path={props.path}
         render={(propsRoute) => {
            return (
               <>
                  <div className='container-fluid'>
                     <div className='row'>
                        <div className='col-8 p-0'>
                           <img
                              src={imgForm}
                              style={{
                                 height: '100vh',
                                 objectFit: 'cover',
                                 width: '100%',
                              }}
                           />
                        </div>
                        <div className='col-4'>
                           <props.component {...propsRoute} />
                        </div>
                     </div>
                  </div>
               </>
            );
         }}
      />
   );
};

export default FormTemplate;
