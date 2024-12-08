'use client';
import { useForm } from '@/hooks/useForm';
import { AppState, User } from '@/interfaces/interface';
import { login } from '@/services/authService';
import { updateUserS } from '@/services/updateUserService';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [gralMsg, setGralMsg] = useState<string | null>(null);

    console.log("user", user);
    console.log("ERROR", error)

    const loginUser = async (email: string, password: string) => {
        try {
            const userData = await login(email, password);
            setUser(userData.usuario);
            console.log('User después del login:', userData.usuario);
            setIsAuthenticated(true);
            setError(null);
            router.push('/profile');
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

    const updateUser = React.useCallback(
        async (formState: {}, userId: string) => {
            try {
                const dataUpdated = await updateUserS(formState, userId);
                console.log("Data actualizada", dataUpdated.user);

                setUser((prevUser) => ({
                    ...prevUser,
                    ...dataUpdated.user,
                }));

                setError(null);
                setGralMsg(() => 'User updated successfully');
            } catch (error) {
                console.log('FAILED', error);
                setError((prevError) => {
                    if (error instanceof Error && error.message) {
                        return error.message;
                    }
                    return 'An unexpected error occurred';
                });
            }
        },
        []
    );



    return (
        <AppContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated, loginUser, updateUser, error, gralMsg }}>
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
