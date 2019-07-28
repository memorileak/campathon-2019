import {senderGet, senderPut} from "./api-sender";

export function getAllNotifications() {
    const route = '/v1/notifications';
    return senderGet(route);
}

export function markNotificationAsRead(noti_id, {is_read}) {
    const route = `/v1/notifications/${noti_id}`;
    return senderPut(route, {is_read});
}