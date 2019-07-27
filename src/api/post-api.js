import {senderGetWithoutAuth} from "./api-sender";

export function getPostList() {
    const route = `/v1/posts`;
    return senderGetWithoutAuth(route);
}

export function getPost(post_id) {
    const route = `/v1/posts/${post_id}`;
    return senderGetWithoutAuth(route);
}