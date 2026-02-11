"use client";

import { createResume } from "@/lib/resumeApi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleCreate = async () => {
        try {
            const resume = await createResume({
                title: "My First Resume",
                personalInfo: {
                    fullName: "Test User",
                    email: "test@example.com",
                    phone: "1234567890",
                    location: "India",
                },
                skills: ["JavaScript", "React"],
                experience: [],
                education: [],
            });

            // alert("Created resume ID: " + resume._id);
            router.push(`/resume/${resume._id}`);
        } catch (err: any) {
            alert("Failed to create resume: " + (err.response?.statusText || err.message));
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleCreate} style={{ display: "block", marginBottom: "20px" }}>
                Create Resume Draft
            </button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
