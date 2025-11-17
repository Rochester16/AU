// src/api.js
import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE || "http://localhost:5000/api",
});

// Attach token if present
API.interceptors.request.use((config) => {
    const raw = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // If legacy state stored "token" directly — support both
    const parsedUser = raw ? JSON.parse(raw) : null;
    const jwt = (parsedUser && parsedUser.token) || token;

    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
});

// Normalize errors
API.interceptors.response.use(
    (res) => res,
    (err) => {
        const message =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Request failed";

        return Promise.reject(new Error(message));
    }
);

// =====================================================
// Convenience wrappers for simpler usage
// =====================================================

// GET with optional query object
export async function apiGet(url, query = {}) {
    const res = await API.get(url, { params: query });
    return res.data;
}

// POST JSON OR FormData
export async function apiPost(url, body) {
    const config = {};
    if (body instanceof FormData) {
        config.headers = { "Content-Type": "multipart/form-data" };
    }
    const res = await API.post(url, body, config);
    return res.data;
}

// PUT JSON OR FormData
export async function apiPut(url, body) {
    const config = {};
    if (body instanceof FormData) {
        config.headers = { "Content-Type": "multipart/form-data" };
    }
    const res = await API.put(url, body, config);
    return res.data;
}

// DELETE endpoint
export async function apiDelete(url, body = null) {
    // Axios DELETE supports body only when using config.data
    const config = {};
    if (body) config.data = body;
    const res = await API.delete(url, config);
    return res.data;
}

export default API;
