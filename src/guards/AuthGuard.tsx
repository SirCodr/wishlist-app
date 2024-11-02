import useAuthStore from '@/store/auth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const session = useAuthStore(state => state.session)
  const auth = session !== undefined

    if (!auth) return <Navigate to="/login" />

    return <Outlet />
}

export default AuthGuard