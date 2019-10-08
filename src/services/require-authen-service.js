import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthenService from '../services/authen-service';
import {saveLastPath} from "../services/path-memorize-service";
import {noti} from "./noti-service";

let redirect = null;

export function redirectTo(new_path) {
    if (redirect) {
        redirect.push(new_path);
    } else {
        console.error('Redirector is not mounted');
    }
}

export function requireAuthen(action) {
    if (AuthenService.getUserInfo()) {
        action();
    } else if (redirect) {
        saveLastPath(window.location.href.replace(window.location.origin, ''));
        redirect.push('/login');
        noti('warning', 'Để sử dụng tính năng này, bạn cần đăng nhập');
    } else {
        console.error('Redirector is not mounted');
    }
}

class Redirect0R extends Component {
    componentDidMount() {redirect = this.props.history};
    render() {return <span className="hidden" />};
}

export const Redirector = withRouter(Redirect0R);