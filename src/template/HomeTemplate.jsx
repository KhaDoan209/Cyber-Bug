import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header/Header';
const HomeTemplate = (props) => {
   return (
      <Route
         exact
         path={props.path}
         render={(propsRoute) => {
            return (
               <>
                  <Header />
                  <props.component {...propsRoute} />
               </>
            );
         }}
      />
   );
};

export default HomeTemplate;
