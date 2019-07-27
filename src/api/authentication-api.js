import {senderPostWithoutAuth} from "./api-sender";

export function userLogIn({user_name, password}) {
    const route = `/v1/users/login`;
    const payload = {user_name, password};
    return senderPostWithoutAuth(route, payload);
}

export function userRegister({full_name, email, user_name, password}) {
    const route = `/v1/users/register`;
    const payload = {full_name, email, user_name, password};
    return senderPostWithoutAuth(route, payload);
}