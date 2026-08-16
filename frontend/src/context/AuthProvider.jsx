import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './authContext';
import { authApi, tokenStore } from '../utils/authApi';

export function AuthProvider({ children }) {
  // Se hidrata desde localStorage para evitar un parpadeo de "no autenticado"
  const [user, setUser] = useState(() => tokenStore.getUser());
  const [isLoading, setIsLoading] = useState(() => Boolean(tokenStore.getToken()));

  // Revalida la sesión contra el backend al montar la app
  useEffect(() => {
    let cancelled = false;

    async function revalidate() {
      if (!tokenStore.getToken()) {
        setIsLoading(false);
        return;
      }

      try {
        const fresh = await authApi.me();
        if (cancelled) return;
        tokenStore.saveUser(fresh);
        setUser(fresh);
      } catch (err) {
        if (cancelled) return;
        // Un fallo de red no debe cerrar la sesión: solo un token rechazado
        if (!err.isNetworkError) {
          tokenStore.clear();
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    revalidate();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const session = await authApi.login(credentials);
    tokenStore.save(session);
    setUser(session.user);
    return session.user;
  }, []);

  const register = useCallback(async (data) => {
    const session = await authApi.register(data);
    tokenStore.save(session);
    setUser(session.user);
    return session.user;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    changePassword: authApi.changePassword,
  }), [user, isLoading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
