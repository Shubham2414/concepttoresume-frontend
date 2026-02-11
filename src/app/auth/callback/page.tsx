"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken } from "@/lib/auth";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            setToken(token);
            router.push("/dashboard");
        } else {
            router.push("/login?error=NoToken");
        }
    }, [router, searchParams]);

    return <p>Processing login...</p>;
}
