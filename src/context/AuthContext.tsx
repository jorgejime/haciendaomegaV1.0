import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, UserRole } from '../types';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    hasRole: (role: UserRole) => boolean;
    hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Usuario de ejemplo - en producción vendría del backend
    const [user, setUser] = useState<User | null>({
        id: '1',
        name: 'Jorge Jiménez',
        email: 'jorge@example.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        role: 'admin', // Cambiar a 'buyer', 'seller', o 'auctioneer' para probar
        verified: true,
        memberSince: 'Enero 2024',
        buyerInfo: {
            totalBids: 12,
            lotsWon: 3,
            favorites: []
        }
    });

    const login = async (email: string, password: string) => {
        // Aquí iría la lógica de autenticación real
        console.log('Login:', email, password);
    };

    const logout = () => {
        setUser(null);
    };

    const hasRole = (role: UserRole): boolean => {
        return user?.role === role;
    };

    const hasAnyRole = (roles: UserRole[]): boolean => {
        return user ? roles.includes(user.role) : false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole, hasAnyRole }}>
            {children}
        </AuthContext.Provider>
    );
};
