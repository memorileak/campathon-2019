import {senderGet} from "../api/api-sender";

export function getAllRole() {
    const route = `/v1/roles`;
    return senderGet(route);
}