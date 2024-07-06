import React, { useEffect, useState } from 'react';
import { getUnclaimedOrders } from '../../api/api.js';
import './UnclaimedOrders.css';

const UnclaimedOrders = () => {
    const [unclaimedOrders, setUnclaimedOrders] = useState(null);

    useEffect(() => {
        const fetchUnclaimedOrders = async () => {
            try {
                const response = await getUnclaimedOrders('894740958', '01.01.2024', '30.06.2024', 'Все города');
                setUnclaimedOrders(response);
            } catch (error) {
                console.error('Ошибка при получении непринятых заказов:', error);
            }
        };

        fetchUnclaimedOrders();
    }, []);

    if (!unclaimedOrders) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>Непринятые заказы</h1>

            <h2>Список городов</h2>
            <ul>
                {unclaimedOrders.cities.map((city, index) => (
                    <li key={index}>{city}</li>
                ))}
            </ul>

            <h2>Количество заказов по статусам</h2>
            <table className="stat-table">
                <thead>
                <tr>
                    <th>Статус</th>
                    <th>Количество заказов</th>
                </tr>
                </thead>
                <tbody>
                {unclaimedOrders.statuses_count_orders.map((count, index) => (
                    <tr key={index}>
                        <td data-label="Статус">{`Статус ${index}`}</td>
                        <td data-label="Количество заказов">{count}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Детали заказов</h2>
            {unclaimedOrders.orders.length > 0 ? (
                <table className="stat-table">
                    <thead>
                    <tr>
                        <th>ID заказа</th>
                        <th>Дата</th>
                        <th>Город</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {unclaimedOrders.orders.map((order) => (
                        <tr key={order.id}>
                            <td data-label="ID заказа">{order.id}</td>
                            <td data-label="Дата">{order.date}</td>
                            <td data-label="Город">{order.city}</td>
                            <td data-label="Сумма">{order.amount}</td>
                            <td data-label="Статус">{order.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div>Нет непринятых заказов.</div>
            )}
        </div>
    );
};

export default UnclaimedOrders;
