import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // [1

    const navigateToLogIn = (e) => {
        e.preventDefault();
        navigate('/signin');
    }

    const navigate = useNavigate();
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Login successful");
                navigate('/auth');
            })
            .catch((error) => {
                setError(error.message); // [2]
                console.log(error.message);
            });
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Sign Up</button>
                <button type="button" onClick={navigateToLogIn}>Log In</button>
            </form>
            {error && (
                <div className="error-box">
                    <p>Error: {error}</p>
                    <button onClick={clearError}>Dismiss</button>
                </div>
            )}
        </div>
    );
};

export default SignUp;