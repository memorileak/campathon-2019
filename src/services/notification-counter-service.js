// import io from "socket.io-client";
import AuthenService from './authen-service';
import {isAuthenticated} from "../utils/authentication-permission-check";

let listeners = {};
let notification_count = 0;

function broadcast() {
    for (let key in listeners) {
        listeners[key]();
    }
}

AuthenService.register('NotificationCounterService', () => {
    if (!isAuthenticated()) {
        listeners = {};
        notification_count = 0
        broadcast();
    }
});

export default {
    getNotificationCount() {
        return notification_count;
    },
    setNotificationCount(noti_count) {
        notification_count = noti_count;
        broadcast();
    },
    register: (key, callback) => {
        listeners[key] = callback;
    },
    unregister: (key) => {
        delete listeners[key];
    }
};
