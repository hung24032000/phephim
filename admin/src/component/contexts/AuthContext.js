import { createContext, useReducer } from "react";
import { AuthReducer } from "../reducers/authReducer";
import axios from "axios";
import { urlAPI } from "./constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: false,
        isAuthenticated: true,
        user: null,
    });

    const loginUser = async (userForm) => {
        try {
            let response;
            // const response = await axios.post(`${urlAPI}/auth/login`, userForm);
            // if (response.data.success) {
            //     localStorage.setItem(LOCAL_TOKEN_NAME, response.data.token);
            // }
            // await loadUser();
            console.log("Login User");
            return (response.data.success = true);
        } catch (error) {
            return { success: false, message: error.message };
        }
    };
    const AuthContextData = {
        authState,
        dispatch,
        loginUser,
    };
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
