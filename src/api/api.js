import axios from 'axios';

// Базовый URL для вашего API
const API_BASE_URL = 'https://av-stat.ru/dez/v1';

// Создание экземпляра axios с базовым URL и заголовками
const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Функция для получения статистики по мастерам
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

// Функция для получения статистики по городам
export const getCitiesStat = async (userId, city, startDate, endDate) => {
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

// Функция для получения непринятых заказов
export const getUnclaimedOrders = async (userId, startDate, endDate, city) => {
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

// Функция для получения заказов в работе
export const getOrdersInWork = async (userId, startDate, endDate, city) => {
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
