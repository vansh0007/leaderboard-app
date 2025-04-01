import api from './api';

export const getWinners = async () => {
    return api.get('/winners');
};

export const getWinnerStats = async () => {
    return api.get('/winners/stats');
};