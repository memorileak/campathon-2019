import React, { Component } from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import { APP_ROUTES } from "./app-routes";
import '../services/noti-service';
import AuthenService from "../services/authen-service";
import { ToastContainer } from "react-toastr";
import {setToast} from '../services/noti-service';

class App extends Component {

    componentDidMount() {
        setToast(this.toast);
        AuthenService.register(this, this.forceUpdate.bind(this));
    };

    componentWillUnmount() {
        AuthenService.unregister(this);
    };

    render() {
        return (
            <div className="app full-height">
                <Switch>
                    {
                        APP_ROUTES.map(route => (
                            <Route
                                key={route.exact + route.path}
                                exact={route.exact}
                                path={route.path}
                                component={route.component}
                            />
                        ))
                    }
                    <Redirect to="/" />
                </Switch>
                <ToastContainer className="toast-bottom-right" ref={el => { this.toast = el }} />
            </div>
        );
    }

};

//
// function requireAuthen(component) {
//     return AuthenService.getUserInfo() ? component : () => <Redirect to='/login' />;
// };
//
// function requireUnAuthen(component) {
//     return AuthenService.getUserInfo() ? () => <Redirect to={popLastPath() || '/dashboard'} /> : component;
// };


export default App;
