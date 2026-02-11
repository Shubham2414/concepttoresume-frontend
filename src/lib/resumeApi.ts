import api from "./api";
import { ResumeData } from "@/types/resume";

export async function createResume(data: ResumeData) {
    const response = await api.post("/resumes", {
        title: data.title,
        content: data,
    });

    return response.data;
}

export async function getResumeById(id: string) {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
}

export async function updateResume(id: string, data: ResumeData) {
    const response = await api.put(`/resumes/${id}`, {
        title: data.title,
        content: data,
    });
    return response.data;
}
