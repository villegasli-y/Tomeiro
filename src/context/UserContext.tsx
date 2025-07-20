import { createContext, useEffect, type ReactNode, useState } from 'react'
import type { User } from '../types/user';
import { getUserLS, removeUserLS, saveUserLS } from "../utils/userLocalStore";
import { getUserSession, removerUserSession, saveUserSession } from "../utils/userSessionStore";
import { v4 as uuidv4 } from 'uuid';

interface UserContextType {
    user: User;
    login: (userData: Omit<User, 'id' | 'auth'>) => void;
    logout: () => void;
}

type Props = {
    children: ReactNode,
}
const UserContext = createContext<UserContextType | null>(null)

const UserProvider = ({ children }: Props) => {

    const [user, setUser] = useState<User>({ id: '', userName: '', auth: false });
    const emptyUser = {
        id: '',
        userName: '',
        auth: false,
    }

    useEffect(() => {
        const sessionUser = getUserSession();
        if (sessionUser === true) {
            const storedUser = getUserLS();
            if (storedUser) {
                setUser(storedUser);
            }
        }
    }, [])

    const login = (userData: Omit<User, 'id' | 'auth'>) => {
        const userPayload: User = { ...userData, id: uuidv4(), auth: true };
        setUser(userPayload);
        saveUserLS(userPayload);
        saveUserSession();
    }

    const logout = () => {
        setUser(emptyUser);
        removerUserSession();
        removeUserLS();
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
export { UserContext };