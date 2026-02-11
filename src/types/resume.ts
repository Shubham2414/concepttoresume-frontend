export type PersonalInfo = {
    fullName: string;
    email: string;
    phone: string;
    location: string;
};

export type Experience = {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
};

export type Education = {
    institution: string;
    degree: string;
    startYear: string;
    endYear: string;
};

export type ResumeData = {
    title: string;
    personalInfo: PersonalInfo;
    skills: string[];
    experience: Experience[];
    education: Education[];
};
