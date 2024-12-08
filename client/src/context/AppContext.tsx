import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService'; // Asumimos que el login es un servicio
import { updateUserS } from '@/services/updateUserService'; // Lo mismo con updateUser
import { AppState, User } from '@/interfaces/interface';

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(user !== null);
    const [error, setError] = useState<string | null>(null);
    const [gralMsg, setGralMsg] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [user]);

    const loginUser = async (email: string, password: string) => {
        try {
            const userData = await login(email, password);
            setUser(userData.usuario);
            setIsAuthenticated(true);
            setError(null);
            router.push('/profile');
        } catch (error) {            
            setIsAuthenticated(false);
            if (error instanceof Error && error.message) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    const logoutUser = () => {        
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
        setGralMsg(null);
        router.push('/login');
    };

    const updateUser = useCallback(
        async (formState: {}, userId: string) => {
            try {
                const dataUpdated = await updateUserS(formState, userId);
                setUser((prevUser) => ({
                    ...prevUser,
                    ...dataUpdated.user,
                }));
                localStorage.setItem('user', JSON.stringify(dataUpdated?.user));
                setError(null);
                setGralMsg('User updated successfully');
            } catch (error) {                
                if (error instanceof Error && error.message) {
                    setError(error.message);
                } else {
                    setError('An unexpected error occurred');
                }
            }
        },
        []
    );

    return (
        <AppContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated, loginUser, logoutUser, updateUser, error, gralMsg }}>
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
