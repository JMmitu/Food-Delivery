import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isModalOpen: boolean;
  openModal: (tab?: "login" | "register") => void;
  closeModal: () => void;
  defaultTab: "login" | "register";
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<"login" | "register">("login");

  const login = useCallback(async (email: string, _password: string) => {
    // Mock auth — accepts any credentials
    await new Promise((r) => setTimeout(r, 800));
    setUser({ name: email.split("@")[0], email, avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=FF6B35&color=fff` });
    setIsModalOpen(false);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    setUser({ name, email, avatar: `https://ui-avatars.com/api/?name=${name}&background=FF6B35&color=fff` });
    setIsModalOpen(false);
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);
  const openModal = useCallback((tab: "login" | "register" = "login") => {
    setDefaultTab(tab);
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isModalOpen, openModal, closeModal, defaultTab }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
