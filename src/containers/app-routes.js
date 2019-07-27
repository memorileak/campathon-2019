import React from 'react';

export const APP_ROUTES = [
    {
        path: "/",
        exact: true,
        auth: false,
        component: () => ( <div>Hello</div> ),
    }
];