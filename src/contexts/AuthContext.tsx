import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('stylemate_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would validate against a backend
      const userId = btoa(email).slice(0, 12); // Create consistent ID for demo
      const user = {
        id: userId,
        email,
        name: email.split('@')[0]
      };
      
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('stylemate_user', JSON.stringify(user));
      toast.success('Welcome back! ✨');
    } catch (error) {
      toast.error('Login failed. Please try again.');
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // In a real app, this would create an account on the backend
      const userId = btoa(email).slice(0, 12);
      const user = {
        id: userId,
        email,
        name: name || email.split('@')[0]
      };
      
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('stylemate_user', JSON.stringify(user));
      toast.success('Welcome to StyleMate! ✨');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('stylemate_user');
    toast.success('See you soon! 👋');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}