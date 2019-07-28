import {senderGet, senderGetWithoutAuth, senderPost, senderUploadFile} from "./api-sender";
import {} from 'query-string';
import {stringify} from "query-string";

export function getPostList({title, sort_attribute, ascending: bool_ascending, page_size, page_number}) {
    const ascending = bool_ascending ? 1 : 0;
    const route = `/v1/posts?${stringify({title, sort_attribute, ascending, page_size, page_number})}`;
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