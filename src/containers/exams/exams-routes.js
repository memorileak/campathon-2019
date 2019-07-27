// import React from 'react';
import ExamView from "./exam-view/exam-view";
import ExamList from "./exam-list/exam-list";
// import {Redirect} from 'react-router-dom';

export const EXAMS_ROUTES = [
    {
        path: "/exams",
        exact: true,
        auth: false,
        component: ExamList,
    }, {
        path: "/exams/:exam_id",
        exact: true,
        auth: false,
        component: ExamView,
    }
];