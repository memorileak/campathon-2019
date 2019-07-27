import React from 'react';
import {Redirect} from 'react-router-dom';
import Exams from './exams/exams';
import Login from "./login/login";
import Register from "./register/register";
import NewExam from "./new-exam/new-exam";

export const APP_ROUTES = [
    {
        path: "/",
        exact: true,
        component: () => ( <Redirect to="/exams" /> ),
    }, {
        path: "/exams",
        exact: false,
        component: Exams,
    }, {
        path: "/login",
        exact: true,
        auth: false,
        component: Login,
    }, {
        path: "/register",
        exact: true,
        auth: false,
        component: Register,
    }, {
        path: "/new-exam",
        exact: true,
        auth: true,
        component: NewExam,
    }
];