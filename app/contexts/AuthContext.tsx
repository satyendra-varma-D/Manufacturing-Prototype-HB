import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'admin' | 'manager' | 'user';
export type IntelligenceMode = 'drawing' | 'bom' | 'visual' | 'text' | 'mixed' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  intelligenceMode: IntelligenceMode;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, mode: IntelligenceMode) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@rfq.com', role: 'admin' as Role },
  { id: '2', name: 'Manager User', email: 'manager@rfq.com', role: 'manager' as Role },
  { id: '3', name: 'Standard User', email: 'user@rfq.com', role: 'user' as Role },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, mode: IntelligenceMode): boolean => {
    // Treat any credentials as valid if email/password is provided, 
    // but default to mock accounts if they match.
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser || (email && password)) {
      const activeUser: User = {
        id: foundUser?.id || 'dynamic-user',
        name: foundUser?.name || email.split('@')[0],
        email: email,
        role: foundUser?.role || 'user',
        intelligenceMode: mode
      };
      setUser(activeUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="intelligence-context-root">
       <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
         {children}
       </AuthContext.Provider>
    </div>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
