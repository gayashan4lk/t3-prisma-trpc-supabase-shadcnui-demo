import Link from "next/link";
import React from "react";
import {XMarkIcon, Bars3Icon} from "@heroicons/react/24/solid";
import {Button} from "~/components/ui/button";
import {createClient} from "~/utils/supabase/server";

const routes: { title: string; href: string }[] = [
    {title: "Mock Features", href: "#features"},
    {title: "Mock Resources", href: "#resources"},
    {title: "Mock Pricing", href: "#pricing"},
];

export default async function Navbar() {
    const supabase = createClient();
    const {data, error} = await supabase.auth.getUser()

    return (
        <div className="flex justify-between px-6 py-2 lg:px-14 bg-slate-800 items-center">
            <div className="flex items-baseline">
                <Link href={"/"} className="shrink-0">
                    <h1 className="text-accent-foreground text-2xl font-bold">Home</h1>
                </Link>
                <div className="ml-5">
                    {routes.map((route, index) => (
                        <Link
                            key={index}
                            href={route.href}
                            className={`hover:text-accent-foreground text-muted-foreground inline-flex w-full items-center px-4 text-sm transition-colors sm:w-auto`}
                        >
                            {route.title}
                        </Link>
                    ))}
                </div>
            </div>
            <div><XMarkIcon className="h-7 w-7"/><Bars3Icon className="h-7 w-7"/></div>
            <div className="hidden items-center gap-2 sm:flex">
                {data?.user && <Link href={"#"} className="w-full sm:w-auto">
                    <Button variant="secondary" size="sm" className="w-full">
                        Logout
                    </Button>
                </Link>}
                {!data?.user && error && <>
                    <Link href={"/login"} className="w-full sm:w-auto">
                        <Button variant="secondary" size="sm" className="w-full">
                            Login
                        </Button>
                    </Link>
                    <Link href={"/signup"} className="w-full sm:w-auto">
                        <Button variant="default" size="sm" className="w-full">
                            Sign Up
                        </Button>
                    </Link>
                </>}
            </div>
        </div>
    );
};
