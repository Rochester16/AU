import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "../../styles/Auth.css";

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await API.post("/auth/register", formData);
        alert("Registration successful!");
        navigate("/login");
        } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
    
            <img className="auth-logo" src="/jewelry/logo.png" alt="logo" />
    
            <h2>SIGN UP</h2>
    
            <div className="auth-box">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
    
                    <select name="role" onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
    
                    <button className="auth-btn">CREATE ACCOUNT</button>
                </form>
    
                <div className="auth-footer">
                    Already have an account?
                    <a href="/user/login">Log in</a>
                </div>
            </div>
    
        </div>
    );
    
};

export default RegisterPage;
