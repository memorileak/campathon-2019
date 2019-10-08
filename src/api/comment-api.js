import {senderGet, senderGetWithoutAuth, senderPost, senderUploadFile} from "./api-sender";
import {stringify} from 'query-string';

export function getCommentsOfPost(post_id) {
    const route = `/v1/posts/${post_id}/comments`;
    return senderGetWithoutAuth(route);
}

export function createComment(post_id, {content, images}) {
    const route = `/v1/posts/${post_id}/comments`;
    return senderUploadFile(route, {content, images});
}

export function checkCommentVoteStatus(comment_id_array) {
    const route = `/v1/comments/vote/check?${stringify({comment_id: comment_id_array})}`;
    return senderGet(route);
}

export function voteComment(comment_id, {vote_type}) {
    const route = `/v1/comments/${comment_id}/vote`;
    return senderPost(route, {vote_type});
}