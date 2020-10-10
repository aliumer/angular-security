import { AppUserAuth } from './app-user-auth';

export const LOGIN_MOCKS: AppUserAuth[] = [
    {
        userName: 'mau',
        bearerToken: 'tokenhere',
        isAuthenticated: true,
        canAccessProduct: true,
        canAddProduct: true,
        canSaveProduct: true,
        canAccessCategories: true,
        canAddCategory: false
    },
    {
        userName: 'jbloggs',
        bearerToken: 'tokenhere',
        isAuthenticated: true,
        canAccessProduct: false,
        canAddProduct: false,
        canSaveProduct: false,
        canAccessCategories: true,
        canAddCategory: false
    }
];
