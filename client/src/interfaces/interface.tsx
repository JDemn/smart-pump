export interface FormState {
    [key: string]: string | number | Boolean | Function | null | [{}] | undefined | {};
}

export interface User {
    _id: string | undefined;
    name: {
        first : string,
        last : string
    };
    email: string;
    avatar?: string;
    picture : string;
    balance : string;
    age : number;
    company : string;
    address : string;
    phone : string;
}
export interface AppState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (status: boolean) => void;
    loginUser: (email: string, password: string) => Promise<void>;
    updateUser : (formState : {} , userId : string )=> Promise<void>;
    error : null | string;
    gralMsg : null | string;
}