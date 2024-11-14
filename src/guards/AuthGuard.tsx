import Loader from "@/components/ui/loader";
import useAuth from "@/hooks/useAuth";
import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const { setSession, setUser, session } = useAuth()
  const [isloading, setloading] = useState(true)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setloading(true)
      setSession(session ?? undefined);
      setUser(session?.user ?? undefined)
      setloading(false)
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isloading) return <Loader />

  if (!session) return <Navigate to='/login' />

  return <Outlet />;
};

export default AuthGuard;
