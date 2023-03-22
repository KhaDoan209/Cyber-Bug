import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import './assets/scss/main.scss';
import FormTemplate from './template/FormTemplate';
import HomeTemplate from './template/HomeTemplate';
import Login from './Pages/Login/Login';
import ProjectDashboard from './Pages/Project/ProjectDashboard';
import Loading from './components/Loading/Loading';
import DrawerHOC from './components/HOC/DrawerHOC';
import Register from './Pages/Register/Register';
import ProjectDetail from './Pages/Project/ProjectDetail';
import UserDashboard from './Pages/User/UserDashboard';
import Profile from './Pages/User/Profile';
export const history = createBrowserHistory();
function App() {
   return (
      <Router history={history}>
         <Loading />
         <DrawerHOC />
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
            <FormTemplate
               exact
               path='/register'
               component={Register}
            />
            <HomeTemplate
               exact
               path='/projectdetail/:projectId'
               component={ProjectDetail}
            />
            <HomeTemplate
               exact
               path='/userdashboard'
               component={UserDashboard}
            />
            <HomeTemplate
               exact
               path='/profile'
               component={Profile}
            />
            <HomeTemplate
               exact
               path='/'
               component={ProjectDashboard}
            />
         </Switch>
      </Router>
   );
}

export default App;
