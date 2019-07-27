import {senderGet, senderGetWithoutAuth, senderPost, senderUploadFile} from "./api-sender";

export function getPostList() {
    const route = `/v1/posts`;
    return senderGetWithoutAuth(route);
}

export function getPost(post_id) {
    const route = `/v1/posts/${post_id}`;
    return senderGetWithoutAuth(route);
}

export function createNewPost({title, images}) {
    const route = `/v1/posts`;
    return senderUploadFile(route, {title, images});
}

export function votePost(post_id, {vote_type}) {
    const route = `/v1/posts/${post_id}/vote`;
    return senderPost(route, {vote_type});
}

export function checkVoteStatus(post_id) {
    const route = `/v1/posts/${post_id}/vote/check`;
    return senderGet(route);
}