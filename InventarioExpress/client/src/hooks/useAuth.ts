import { useState, useEffect } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout } from '../services/api';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        const loggedInUser = await apiLogin(credentials);
        setUser(loggedInUser);
    };

    const logout = async () => {
        await apiLogout();
        setUser(null);
    };

    return { user, loading, login, logout };
};

export default useAuth;