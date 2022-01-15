import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: string,
    username: string,
    password?: string,
    email: string,
    accessToken: string,
    roles: Array<string>
}

export interface AuthInterface {
    isLoggedIn: boolean,
    user: User
}

export interface LoginInterface {
    username: string,
    password: string
}

export interface RegisterInterface {
    username: string,
    password: string,
    email: string
}

const user = JSON.parse(localStorage.getItem("user") || '{}');

const initialState = user.username
    ? { isLoggedIn:true, user }
    : { isLoggedIn: false, user:null }

// on simule des réponses positives du backend
// en prod, le login & l'inscription doivent se faire en Async avec createAsyncThunk pour aller questionner le backend
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<RegisterInterface>) => {
            let dataFromBackEnd: User = {
                id: "1",
                username: action.payload.username,
                email: action.payload.email,
                accessToken: "12345",
                roles: ["ADMIN", "MODERATEUR"]
            }

            state.user = dataFromBackEnd;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(dataFromBackEnd));
        },
        login: (state, action: PayloadAction<LoginInterface>) => {
            let dataFromBackEnd: User = {
                id: "1",
                username: action.payload.username,
                email: "test@account.fr",
                accessToken: "12345",
                roles: ["ADMIN", "MODERATEUR"]
            }

            state.user = dataFromBackEnd;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(dataFromBackEnd));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("user");
        },
        changeRole: (state, action:any) => {
            if (action.payload.toString().length < 1) {
                state.user.roles = ["ADMIN", "MODERATEUR"];
            } else {
                state.user.roles = [action.payload];
            }
        }
    }
});

const { reducer, actions } = authSlice;
export const { register, login, logout, changeRole } = actions;
export default reducer;