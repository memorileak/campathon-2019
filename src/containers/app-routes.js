import React from 'react';
import {Redirect} from 'react-router-dom';
import Exams from './exams/exams';

export const APP_ROUTES = [
    {
        path: "/",
        exact: true,
        auth: false,
        component: () => ( <Redirect to="/exams" /> ),
    }, {
        path: "/exams",
        exact: true,
        auth: false,
        component: Exams,
    }
];