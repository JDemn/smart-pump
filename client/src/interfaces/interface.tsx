export interface FormState {
    [key: string]: string | number | Boolean | Function | null | [{}] | undefined;
}
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}
export interface AppState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (status: boolean) => void;
    loginUser: (email: string, password: string) => Promise<void>;
    error : null | string;
}