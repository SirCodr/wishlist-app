import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | undefined;
  session: Session | undefined;
  setUser: (user: User | undefined) => void;
  setSession: (session: Session | undefined) => void;
}

const middlewares = (config: StateCreator<AuthState>) => devtools(persist(config, { name: 'authStore' }));

const useAuthStore = create<AuthState>()(
  middlewares((set) => ({
    user: undefined,
    session: undefined,
    setUser: (user) => set(() => ({ user })),
    setSession: (session) => set(() => ({ session })),
  }))
);

export default useAuthStore;
