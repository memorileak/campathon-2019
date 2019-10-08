import {senderGet, senderPut} from "./api-sender";
import {stringify} from 'query-string';

export function getListUsers({page_size, page_number, sort_attribute, ascending: bool_ascending}) {
    const ascending = bool_ascending ? 1 : 0;
    const route = `/v1/users?${stringify({page_size, page_number, sort_attribute, ascending})}`;
    return senderGet(route);
}

export function changeRoleUser(user_id, {role_id, reason}) {
    const route = `/v1/users/${user_id}`;
    return senderPut(route, {role_id, reason});
}