import React from 'react'; 
import { Route } from 'react-router';
import ForgotPasswordPage from './pages/ForgotPassword';
import GetStartedPage from './pages/GetStartedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export const AuthRoutes = [
    <Route key="register" path="/register" component={RegisterPage} />,
    <Route key="login" path="/login" component={LoginPage} />,
    <Route key="forgotPassword" path="/forgotPassword" component={ForgotPasswordPage} />, 
    <Route key="startedPage" path="/startedPage" component={GetStartedPage} />, 
]