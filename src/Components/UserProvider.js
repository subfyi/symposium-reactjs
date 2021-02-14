
import React, { useContext } from 'react';
import { useFetch} from "react-admin-base";

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [ user ] = useFetch('/api/user/me');

    if (!user)
        return null;

    return <UserContext.Provider value={user}>
        { children }
    </UserContext.Provider>
}
