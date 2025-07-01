import type { AuthUser } from '@/types/User/User';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
        localStorage.setItem('token', token);
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
          localStorage.removeItem('token');
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
