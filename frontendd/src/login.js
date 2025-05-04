import React, { useState } from 'react';
import './login.css';
import logo from './logo.jpg';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://127.0.0.1:8000/token/", { username, password }, { headers: { 'Content-Type': 'application/json' } });
            const { access } = response.data;
            login(access, { username });
            navigate("/home");
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            setError(error.response?.data?.detail || "Invalid username or password");
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Login" className="login-image" />
                {error && <p className="error-message">{error}</p>}
                <div className="input-box">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
