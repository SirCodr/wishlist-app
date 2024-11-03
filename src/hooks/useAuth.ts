import { UserProps } from '@/types/auth'
import { login as loginService, logout as logoutService } from '../services/auth'
import useAuthStore from '@/store/auth'

export default function useAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const setSession = useAuthStore((state) => state.setSession);

  async function login(user: UserProps) {
    const { data, error } = await loginService(user)

    if (error) throw Error(error.message)

    setUser(data.user)
    setSession(data.session)
  }

  async function logout() {
    await logoutService()
    setUser(undefined)
    setSession(undefined)
  }

  return { login, logout }
}
