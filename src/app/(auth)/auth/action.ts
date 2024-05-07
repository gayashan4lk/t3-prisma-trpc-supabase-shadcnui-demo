"use server";

import {createClient} from "~/utils/supabase/server";
import {headers} from "next/headers";
import type {SignupInput} from "../signup/page";

const supabase = createClient();
const origin = headers().get("origin");

export async function signUp(data: SignupInput) {
    "use server";

    const {error} = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        return {
            error: error.message,
        };
    }
}

export async function signIn(data: { email: string, password: string }) {
    "use server";

    const {error} = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    });
    if (error) {
        return {
            error: error.message,
        };
    }
}