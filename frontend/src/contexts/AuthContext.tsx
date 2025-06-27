
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'starter' | 'pro' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@sweetcupcakes.com',
    avatar: '/placeholder.svg',
    plan: 'pro'
  });

  const login = (email: string, password: string) => {
    // Mock login - in real app this would call an API
    setUser({
      id: '1',
      name: 'Sarah Chen',
      email: email,
      avatar: '/placeholder.svg',
      plan: 'pro'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
