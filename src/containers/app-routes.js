import React from 'react';
import {Redirect} from 'react-router-dom';
import {USER_PERMISSIONS} from "../constants/user-permissions";
import Exams from './exams/exams';
import Login from "./login/login";
import Register from "./register/register";
import NewExam from "./new-exam/new-exam";
import Users from "./users/users";
import UserProfile from "./user-profile/user-profile";

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
    }, {
        path: "/users",
        exact: true,
        auth: true,
        permission_required: USER_PERMISSIONS.list_user,
        component: Users,
    }, {
        path: "/user-profile/:user_id",
        exact: true,
        component: UserProfile,
    }
];