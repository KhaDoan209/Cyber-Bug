import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import './assets/scss/main.scss';
import FormTemplate from './template/FormTemplate';
import HomeTemplate from './template/HomeTemplate';
import Login from './Pages/Login/Login';
import ProjectDashboard from './Pages/Project/ProjectDashboard';
export const history = createBrowserHistory();
function App() {
   return (
      <Router history={history}>
         <Switch>
            <HomeTemplate
               path='/home'
               component={ProjectDashboard}
            />
            <FormTemplate
               exact
               path='/login'
               component={Login}
            />
            <HomeTemplate
               path='/'
               component={ProjectDashboard}
            />
         </Switch>
      </Router>
   );
}

export default App;
