"use client";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AdminPage() {
    const {data: session, status} = useSession();
    const router = useRouter();

    console.log('ADMIN', session?.user?.role === "admin");

    useEffect(() => {
        if (status === "loading") return;

        if (!session || session?.user?.role !== "admin") {
            router.replace("/");
        }
    }, [session, status, router]);

    if (status === "loading" || !session) return;

    return (
        <span>Admin Panel</span>
    );
}


