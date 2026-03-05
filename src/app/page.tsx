import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import LandingClient from './LandingClient'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If already logged in, redirect them immediately
  if (user) {
    redirect('/dashboard')
  }

  return <LandingClient />
}
