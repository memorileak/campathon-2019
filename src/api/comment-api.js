import {senderGetWithoutAuth} from "./api-sender";

export function getCommentsOfPost(post_id) {
    const route = `/v1/posts/${post_id}/comments`;
    return senderGetWithoutAuth(route);
}