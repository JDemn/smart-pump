'use client';
import { AppState, User } from '@/interfaces/interface';
import { login } from '@/services/authService';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode , useEffect } from 'react';

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    console.log("user", user);
    console.log("ERROR",error)
    useEffect(() => {
        setMounted(true);
    }, []);
    const loginUser = async (email: string, password: string) => {        
        try {
            const userData = await login(email, password);
            setUser(userData.usuario);

            setIsAuthenticated(true);
            setError(null);
            if (mounted) {
                router.push('/profile');
            }
        } catch (error) {
            console.log('LOGIN FAILED', error);
            setIsAuthenticated(false);
            if (error instanceof Error && error.message) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <AppContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated, loginUser , error}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppState => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
