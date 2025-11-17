import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "../../styles/Auth.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await API.post("/auth/login", formData);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/books");
        } catch (err) {
        alert(err.response?.data?.message || "Login failed");
        }
  };

  return (
    <div className="auth-container">

        <img className="auth-logo" src="/jewelry/logo.png" alt="logo" />

        <h2>LOGIN</h2>

        <div className="auth-box">
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                
                <button type="submit" className="auth-btn">LOG IN</button>
            </form>

            <div className="auth-footer">
                Don’t have an account?
                <a href="/user/register">Sign Up</a>
            </div>
        </div>
    </div>
);

};

export default LoginPage;
