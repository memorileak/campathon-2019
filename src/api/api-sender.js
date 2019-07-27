import axios from 'axios';
import AuthenService from '../services/authen-service';
import {noti, sleepNoti} from "../services/noti-service";
import {saveLastPath} from "../services/path-memorize-service";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function handleResponse(res) {
    if (!res.data) {
        return Promise.reject('Something went wrong');
    } else {
        if (res.data.success) {
            return Promise.resolve(res.data.data);
        } else {
            if (res.data.code === 22 && AuthenService.getUserInfo()) {
                saveLastPath(window.location.href.replace(window.location.origin, ''));
                AuthenService.logOut();
                noti('warning', 'Your session has expired. Please login again.');
                sleepNoti();
            }
            return Promise.reject(res.data.reason);
        }
    }
}

export function senderGet(route, access_token) {
    let url = `${API_BASE_URL}${route}`;
    let headers = {
        token: access_token || AuthenService.getUserInfo().token
    };
    return axios.get(url, {headers}).then(handleResponse);
}

export function senderPost(route, payload, access_token) {
    let url = `${API_BASE_URL}${route}`;
    let headers = {
        token: access_token || AuthenService.getUserInfo().token
    };
    return axios.post(url, payload, {headers}).then(handleResponse);
}

export function senderPut(route, payload, access_token) {
    let url = `${API_BASE_URL}${route}`;
    let headers = {
        token: access_token || AuthenService.getUserInfo().token
    };
    return axios.put(url, payload, {headers}).then(handleResponse);
}

export function senderDelete(route, access_token) {
    let url = `${API_BASE_URL}${route}`;
    let headers = {
        token: access_token || AuthenService.getUserInfo().token
    };
    return axios.delete(url, {headers}).then(handleResponse);
}

export function senderGetWithoutAuth(route) {
    let url = `${API_BASE_URL}${route}`;
    return axios.get(url).then(handleResponse);
}

export function senderPostWithoutAuth(route, payload) {
    let url = `${API_BASE_URL}${route}`;
    return axios.post(url, payload).then(handleResponse);
}

export function senderPutWithoutAuth(route, payload) {
    let url = `${API_BASE_URL}${route}`;
    return axios.put(url, payload).then(handleResponse);
}

export function senderDeleteWithoutAuth(route) {
    let url = `${API_BASE_URL}${route}`;
    return axios.delete(url).then(handleResponse);
}