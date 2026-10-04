import { useState } from "react";

import AuthForm from "../components/AuthForm";

function Authentication() {

    const [isLogin, setIsLogin] =
        useState(true);

    return (
        <div className="auth-page">

            <div className="auth-container">

                <h1>JobHub</h1>

                <p className="auth-subtitle">
                    Find your next opportunity
                </p>

                <div className="auth-tabs">

                    <button
                        className={
                            isLogin
                                ? "active-tab"
                                : ""
                        }
                        onClick={() =>
                            setIsLogin(true)
                        }
                    >
                        Login
                    </button>

                    <button
                        className={
                            !isLogin
                                ? "active-tab"
                                : ""
                        }
                        onClick={() =>
                            setIsLogin(false)
                        }
                    >
                        Register
                    </button>

                </div>

                <AuthForm
                    isLogin={isLogin}
                />

            </div>

        </div>
    );
}

export default Authentication;