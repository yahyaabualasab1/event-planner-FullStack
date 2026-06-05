import { create } from "zustand";

type AuthState = {
  token: string | null;
  admin: any;
  isAuthenticated: boolean;

  setToken: (token: string) => void;
  setAdmin: (admin: any) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  admin: null,
  isAuthenticated: !!localStorage.getItem("token"),

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },

  setAdmin: (admin) => set({ admin }),

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, admin: null, isAuthenticated: false });
  },
}));

//global state
//store token + admin data
