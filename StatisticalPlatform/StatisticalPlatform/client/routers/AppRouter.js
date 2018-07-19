import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import LandingPage from '../components/LandingPage/LandingPage';
import SignupPage from '../components/SignUp/SignupPage';
import LoginPage from '../components/SignIn/LoginPage';
import WholeThing from '../components/Dashboard/WholeThing';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={LandingPage} exact={true} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={WholeThing} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter
