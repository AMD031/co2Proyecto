
import * as fromLogin from '../actions';


export interface LoginState {
    login: boolean
}

const estadoInicial: LoginState = {
    login: false
};

export function loginReducer(state = estadoInicial, action: fromLogin.loginAcciones): LoginState {
    switch (action.type) {
        case fromLogin.LOGIN:
            return {
                ...state,
                login: true
            };
        case fromLogin.LOGOUT:
            return {
                ...state,
                login: false
            };
        default:
            return state;

    }

}
