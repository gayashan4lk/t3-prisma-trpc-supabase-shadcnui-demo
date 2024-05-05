import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createClient } from '~/utils/supabase/server'

export async function GET(req: Request) {
  const reqUrl = new URL(req.url)
  const code = reqUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(reqUrl.origin)
}
