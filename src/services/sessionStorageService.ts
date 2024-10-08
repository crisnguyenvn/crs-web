import { AuthenticatedInfo } from "../models/authenticated-info/AuthenticatedInfo";
import { TokenInfo } from "../models/authenticated-info/TokenInfo";
import { UserLoggedInInfo } from "../models/authenticated-info/UserLoggedInInfo";
import { RoleEnum } from "../models/enums/RoleEnum";

export class SessionStorageService {
    private TOKEN_KEY: string = "token_info";

    private USER_INFO_KEY: string = "user_info";

    saveTokenAndUserInfo = (authenticatedInfo: AuthenticatedInfo): void => {
        const tokenInfo: TokenInfo = {
            tokenType: authenticatedInfo.tokenType,
            accessToken: authenticatedInfo.accessToken,
            refreshToken: authenticatedInfo.refreshToken,
        };

        sessionStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenInfo));

        const userInfo: UserLoggedInInfo = {
            id: authenticatedInfo.id,
            username: authenticatedInfo.username,
            email: authenticatedInfo.email,
            firstname: authenticatedInfo.firstname,
            lastname: authenticatedInfo.lastname,
            roles: authenticatedInfo.roles,
        };

        sessionStorage.setItem(this.USER_INFO_KEY, JSON.stringify(userInfo));
    };

    removeTokenAndUserInfo = (): void => {
        sessionStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.USER_INFO_KEY);
    };

    getTokenInfo = (): TokenInfo | null => {
        return this.getItem(this.TOKEN_KEY);
    };

    getAccessToken = (): string | null => {
        const tokenInfo: TokenInfo | null = this.getTokenInfo();
        return tokenInfo?.accessToken as string | null;
    };

    getRefreshToken = (): string | null => {
        const tokenInfo: TokenInfo | null = this.getTokenInfo();
        return tokenInfo?.refreshToken as string | null;
    };

    getCurrentUserInfo = (): UserLoggedInInfo | null => {
        return this.getItem(this.USER_INFO_KEY);
    };

    isAuthenticated = (): boolean => {
        const currentUser: UserLoggedInInfo | null = this.getCurrentUserInfo();

        // TODO: check whether the token is expired or not
        if (currentUser) {
            return true;
        }
        return false;
    };

    getUserRoles = (): string[] => {
        return this.getCurrentUserInfo()?.roles || [];
    };

    isSuperAdmin = (): boolean => {
        return this.getUserRoles().includes(RoleEnum.SUPERADMIN);
    };

    isAdmin = (): boolean => {
        return (
            this.isSuperAdmin() || this.getUserRoles().includes(RoleEnum.ADMIN)
        );
    };

    clearSessionStorage = (): void => {
        sessionStorage.clear();
    };

    private getItem = (key: string) => {
        const data: string | null = sessionStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    };
}
