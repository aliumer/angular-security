import { AppUserClaim } from './app-user-claim';

export class AppUserAuth {
    userName: string;
    bearerToken: string;
    isAuthenticated: boolean;
    claims: AppUserClaim[] = [];
}
