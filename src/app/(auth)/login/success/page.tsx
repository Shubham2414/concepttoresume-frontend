"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";

function LoginSuccessContent() {
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = params.get("token");
        if (token) {
            setToken(token);
            router.replace("/dashboard");
        }
    }, [params, router]);

    return <p>Logging you in...</p>;
}

export default function LoginSuccessPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <LoginSuccessContent />
        </Suspense>
    );
}
