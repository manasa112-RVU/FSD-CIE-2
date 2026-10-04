import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm({ isLogin }) {

    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [message, setMessage] =
        useState("");

    const handleSubmit =
        async (event) => {

            event.preventDefault();

            setMessage("");

            try {

                const url = isLogin
                    ? "http://localhost:5000/api/auth/login"
                    : "http://localhost:5000/api/auth/register";

                const body = isLogin
                    ? {
                        email,
                        password
                    }
                    : {
                        name,
                        email,
                        password
                    };

                const response =
                    await fetch(url, {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(body)
                    });

                const data =
                    await response.json();

                if (!response.ok) {

                    setMessage(
                        data.message
                    );

                    return;
                }

                if (isLogin) {

                    localStorage.setItem(
                        "jobhubUser",
                        JSON.stringify(
                            data.user
                        )
                    );

                    navigate("/jobs");

                } else {

                    setMessage(
                        "Registration successful! Please login."
                    );

                    setName("");
                    setEmail("");
                    setPassword("");
                }

            } catch (error) {

                console.error(error);

                setMessage(
                    "Unable to connect to server."
                );
            }
        };

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit}
        >

            {!isLogin && (
                <>
                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(event) =>
                            setName(
                                event.target.value
                            )
                        }
                        required
                    />
                </>
            )}

            <label>
                Email
            </label>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                    setEmail(
                        event.target.value
                    )
                }
                required
            />

            <label>
                Password
            </label>

            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                    setPassword(
                        event.target.value
                    )
                }
                required
            />

            <button type="submit">
                {isLogin
                    ? "Login"
                    : "Create Account"}
            </button>

            {message && (
                <p className="form-message">
                    {message}
                </p>
            )}

        </form>
    );
}

export default AuthForm;