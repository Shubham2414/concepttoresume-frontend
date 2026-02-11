"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getResumeById, updateResume } from "@/lib/resumeApi";
import { ResumeData } from "@/types/resume";

export default function ResumeEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [resume, setResume] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getResumeById(id)
            .then((data) => {
                // Backend returns the whole document, but 'content' field has the ResumeData
                // We need to merge title from root if needed, but for now let's use content
                if (data.content) {
                    // Ensure title is synced
                    setResume({ ...data.content, title: data.title });
                } else {
                    // Fallback if structure is flat (it shouldn't be based on our schema)
                    setResume(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                alert("Failed to load resume");
                router.push("/dashboard");
            });
    }, [id, router]);

    const handleSave = async () => {
        if (!resume) return;
        setSaving(true);
        try {
            await updateResume(id, resume);
            alert("Saved successfully!");
        } catch (err) {
            alert("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field: keyof ResumeData, value: any) => {
        if (!resume) return;
        setResume({ ...resume, [field]: value });
    };

    const handlePersonalInfoChange = (field: string, value: string) => {
        if (!resume) return;
        setResume({
            ...resume,
            personalInfo: { ...resume.personalInfo, [field]: value }
        });
    };

    if (loading) return <p>Loading resume...</p>;
    if (!resume) return <p>Resume not found</p>;

    return (
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
            {/* Editor Column */}
            <div style={{ flex: 1, borderRight: "1px solid #ccc", paddingRight: "20px" }}>
                <h1>Editor</h1>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block" }}>Resume Title</label>
                    <input
                        value={resume.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <h3>Personal Info</h3>
                <div style={{ marginBottom: "10px" }}>
                    <label>Full Name</label>
                    <input
                        value={resume.personalInfo.fullName}
                        onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Email</label>
                    <input
                        value={resume.personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        background: "black",
                        color: "white",
                        cursor: saving ? "not-allowed" : "pointer"
                    }}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                    onClick={() => router.push("/dashboard")}
                    style={{
                        marginTop: "20px",
                        marginLeft: "10px",
                        padding: "10px 20px",
                        background: "#ccc",
                        color: "black"
                    }}
                >
                    Back
                </button>
            </div>

            {/* Preview Column */}
            <div style={{ flex: 1, paddingLeft: "20px", background: "#f9f9f9" }}>
                <h1>Preview</h1>
                <div style={{ border: "1px solid #ddd", padding: "40px", background: "white", minHeight: "500px" }}>
                    <h2 style={{ textAlign: "center" }}>{resume.personalInfo.fullName}</h2>
                    <p style={{ textAlign: "center", color: "#666" }}>
                        {resume.personalInfo.email} | {resume.personalInfo.phone || "No Phone"} | {resume.personalInfo.location || "No Location"}
                    </p>
                    <hr />
                    {/* We will add more sections here later */}
                    <p><strong>Skills:</strong> {resume.skills.join(", ")}</p>
                </div>
            </div>
        </div>
    );
}
