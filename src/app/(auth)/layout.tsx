import React from "react";
import {createClient} from "~/utils/supabase/server";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import Link from "next/link";

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const supabase = createClient(cookies());

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/");
    }
    return (<>
        <Link href={"/"} className="absolute left-6 top-4 shrink-0 lg:left-14">
            <h1 className="text-accent-foreground text-2xl font-bold">devlink</h1>
        </Link>
        {children}
    </>);
}