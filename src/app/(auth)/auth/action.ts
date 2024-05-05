"use server";

import {createClient} from "~/utils/supabase/server";
import {cookies, headers} from "next/headers";
import type {SignupInput} from "../signup/page";

const supabase = createClient(cookies());
const origin = headers().get("origin");

export const signUp = async (data: SignupInput) => {
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
};