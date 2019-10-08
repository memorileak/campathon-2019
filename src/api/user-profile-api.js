import {senderGetWithoutAuth} from "./api-sender";

export function getUserProfileInformation(user_id) {
    const route = `/v1/users/${user_id}`;
    return senderGetWithoutAuth(route);
}