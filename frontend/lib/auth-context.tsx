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

  useEffect(() => {
    // ✅ Demo mode: bypass Firebase auth completely
    if (DEMO_MODE) {
      setUser(
        {
          uid: "demo-user",
          email: "demo@clinect.app",
          displayName: "Demo User",
        } as unknown as User
      );
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

(async () => {
  const { auth } = await import("./firebase");
  unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);
  });
})();

return () => unsubscribe?.();

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
