import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] login';
export const LOGOUT = '[Auth] logout';

export class login implements Action {
    readonly type = LOGIN;
    // constructor(public payload: any) { }
}

export class logOut implements Action {
    readonly type = LOGOUT;
    // constructor(public payload: any) { }
}


export type loginAcciones = login | logOut