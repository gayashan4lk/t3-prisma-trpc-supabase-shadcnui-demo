'use server'

import { createClient } from '~/utils/supabase/server'
import { headers } from 'next/headers'
import type { SignupInput } from '../signup/page'

const supabase = createClient()
const origin = headers().get('origin')

export async function signUp(data: SignupInput) {
  'use server'

  const response = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })
  console.log('signUp action response:', response)

  if (response.error) {
    return {
      error: response.error.message,
    }
  }
}

export async function signIn(data: { email: string; password: string }) {
  'use server'

  const response = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  console.log('signIn action response:', response)

  if (response.error) {
    return {
      error: response.error.message,
    }
  }
}
