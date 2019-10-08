import AuthenService from '../services/authen-service';
import {safeRetrieve} from "./retrieve-value-utils";

export function isAuthenticated() {
    return !!AuthenService.getUserInfo();
}

export function isAllowedWithPermission(permission) {
    const permissions = safeRetrieve(AuthenService.getUserInfo(), ['user', 'role', 'permission']) || [];
    return permissions.includes(permission);
}