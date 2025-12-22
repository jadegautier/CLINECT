"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

useEffect(() => {
  if (DEMO_MODE) {
    setUser({ uid: "demo-user", email: "demo@clinect.app" } as any);
    setLoading(false);
    return;
  }

  if (!auth) {
    setUser(null);
    setLoading(false);
    return;
  }

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);
  });

  return unsubscribe;
}, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
