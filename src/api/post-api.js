import {senderGetWithoutAuth} from "./api-sender";

export function getPostList() {
    const route = `/v1/posts`;
    return senderGetWithoutAuth(route);
}