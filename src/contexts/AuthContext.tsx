import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    Dispatch,
} from "react";

type User = {
    name: string;
    email: string;
    password: string;
    avatar: string;
};

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
};

type AuthAction =
    | { type: "login"; payload: User }
    | { type: "logout" };

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
};

const FAKE_USER: User = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return { ...state, user: null, isAuthenticated: false };
        default:
            throw new Error("Unknown action");
    }
}


function AuthProvider({ children }: AuthProviderProps) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    function login(email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContext was used outside AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };
