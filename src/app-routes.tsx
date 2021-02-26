import React from 'react';
import { Redirect } from 'react-router';
import { AuthRoutes } from './features/auth';

export const appRoutes = [
    ...AuthRoutes,
    <Redirect key="main-home-page" from="/" to="/login"/>,
]