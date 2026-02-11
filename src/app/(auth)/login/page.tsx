"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, router]);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });
            setToken(res.data.token);
            alert("Login success");
        } catch {
            setError("Login failed");
        }
    };

    const handleGoogleLogin = () => {
        window.location.href =
            "https://concepttoresume-backend.onrender.com/auth/google";
    };

    const testProtected = async () => {
        try {
            const res = await api.post("/resumes", {
                title: "Frontend Test Resume",
                content: { test: true },
            });
            alert("Resume created: " + res.data._id);
        } catch (err: any) { // Type as any for simple error handling in test
            alert("Protected API Failed: " + (err.response?.status || err.message));
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", margin: "10px 0" }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", margin: "10px 0" }}
            />

            <button onClick={handleLogin} style={{ marginRight: "10px" }}>Login</button>

            <button onClick={handleGoogleLogin} style={{ marginRight: "10px" }}>
                Login with Google
            </button>

            <button onClick={testProtected}>
                Test Protected API
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
