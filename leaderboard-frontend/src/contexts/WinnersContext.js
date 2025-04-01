// resources/js/contexts/WinnersContext.jsx
import { createContext, useState, useEffect } from 'react';
import { getWinners, getWinnerStats } from '../services/winnersApi';

export const WinnersContext = createContext();

export const WinnersProvider = ({ children }) => {
    const [winners, setWinners] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWinners = async () => {
        try {
            setLoading(true);
            const response = await getWinners();
            // Ensure we always have an array
            setWinners(Array.isArray(response.data?.data) ? response.data.data : []);
            setError(null);
        } catch (err) {
            setError(err.message);
            setWinners([]); // Reset to empty array on error
        } finally {
            setLoading(false);
        }
    };
    

    const fetchStats = async () => {
        try {
            const response = await getWinnerStats();
            setStats(response.data);
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    useEffect(() => {
        fetchWinners();
        fetchStats();
    }, []);

    return (
        <WinnersContext.Provider value={{ winners, stats, loading, error, refresh: fetchWinners }}>
            {children}
        </WinnersContext.Provider>
    );
};