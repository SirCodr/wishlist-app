import { UserProps } from '@/types/auth'
import useAuthStore from '@/store/auth'
import { supabase } from '@/supabase';
import { Provider } from '@supabase/supabase-js';

export default function useAuth() {
  const user = useAuthStore(state => state.user)
  const session = useAuthStore(state => state.session)
  const setUser = useAuthStore((state) => state.setUser);
  const setSession = useAuthStore((state) => state.setSession);

  async function login(user: UserProps) {
    const { data, error } = await supabase.auth.signInWithPassword(user)

    if (error) throw error

    setUser(data.user)
    setSession(data.session)

    return data
  }

  async function loginWitProvider(provider: Provider) {
    const redirectTo = process.env.VITE_APP_REDIRECT_URL;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo
      }
    })

    if (error) throw error
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error) throw ({...error, message: 'Something wrong on sign out'})

    setUser(undefined)
    setSession(undefined)
  }

  async function refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession(session?.refresh_token ? { refresh_token: session.refresh_token } : undefined)

      if (error) throw ('Something wrong on refreshing session')

      setSession(data.session || undefined)
      setUser(data.user || undefined)
    } catch (error) {
      console.log(error);
    }
  }

  function isSessionActive() {
    if (!session || !session.expires_at) return false

    const currentTime = Date.now()
    const sessionTime = session.expires_at * 1000

    return currentTime <= sessionTime
  }

  return { login, loginWitProvider, logout, refreshSession, isSessionActive, session, user, setUser, setSession }
}
