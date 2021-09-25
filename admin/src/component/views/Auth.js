import React from "react";
import "../../assets/css/auth.css";
import LoginForm from "../auth/LoginForm";

const Auth = () => {
    return (
        <div className="body-login">
            <div className="body__element">
                <div className="container-app">
                    <h2 className="container-app__element">Admin Movie App</h2>
                    <div className="container-app-form">
                        <div className="container-app-form__element">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
