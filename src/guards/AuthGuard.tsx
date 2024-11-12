import { refreshSession } from '@/services/auth';
import useAuthStore from '@/store/auth';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

const AuthGuard = () => {
  const session = useAuthStore(state => state.session)
  const setSession = useAuthStore(state => state.setSession)
  const setUser = useAuthStore(state => state.setUser)
  const auth = session !== undefined

  useEffect(() => {
    const checkSession = async () => {
      if (!auth || !session || !session.expires_at) return

      const currentTime = Date.now()
      const sessionTime = session.expires_at * 1000

      if (currentTime > sessionTime) {
        const { data, error } = await refreshSession(session.refresh_token)
        
        if (error) return toast.error(error.name)

        setSession(data.session)
        setUser(data.user)
      }
    };

    checkSession();
  }, [session])

  if (!auth || !session) return <Navigate to="/login" />

  return <Outlet />
}

export default AuthGuard