import axios from 'axios';

const API_BASE_URL = 'https://av-stat.ru/dez/v1';

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getMastersStat = async (userId, city, startDate, endDate) => {
    const response = await instance.get(`/masters-stat`, {
        params: {
            user_id: userId,
            city: city,
            start_date: startDate,
            end_date: endDate
        }
    });
    return response.data;
};

export const getCitiesStat = async (userId,city, startDate, endDate) => {
    const response = await instance.get(`/cities-stat`, {
        params: {
            user_id: userId,
            city: city,
            start_date: startDate,
            end_date: endDate
        }
    });
    return response.data;
};

export const getUnclaimedOrders = async (userId,  startDate, endDate,city,) => {
    const response = await instance.get(`/not-accepted-leads`, {
        params: {
            user_id: userId,
            start_date: startDate,
            end_date: endDate,
            city: city,
        }
    });
    return response.data;
};

export const getOrdersInWork = async (userId,   startDate, endDate,city) => {
    const response = await instance.get(`/orders-in-work`, {
        params: {
            user_id: userId,
            start_date: startDate,
            end_date: endDate,
            city: city,

        }
    });
    return response.data;
};
