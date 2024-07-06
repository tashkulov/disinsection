import React, { useEffect, useState } from 'react';
import { getOrdersInWork } from '../../api/api.js';
import './OrdersInProgress.css';

const OrdersInProgress = () => {
    const [ordersInProgress, setOrdersInProgress] = useState(null);

    useEffect(() => {
        const fetchOrdersInWork = async () => {
            try {
                const response = await getOrdersInWork('894740958', '07.01.2024', '30.06.2024', 'Все города');
                setOrdersInProgress(response);
            } catch (error) {
                console.error('Ошибка при получении заявок в работе:', error);
            }
        };

        fetchOrdersInWork();
    }, []);

    if (!ordersInProgress) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>Заявки в работе</h1>
            <h2>Список городов</h2>
            <ul>
                {ordersInProgress.cities.map((city, index) => (
                    <li key={index}>{city}</li>
                ))}
            </ul>

            <h2>Детали заявок</h2>
            {ordersInProgress.orders.length > 0 ? (
                <table className="stat-table">
                    <thead>
                    <tr>
                        <th>ID заявки</th>
                        <th>Дата начала</th>
                        <th>Город</th>
                        <th>Мастер</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersInProgress.orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.start_date}</td>
                            <td>{order.city}</td>
                            <td>{order.master}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div>Нет заявок в работе.</div>
            )}
        </div>
    );
};

export default OrdersInProgress;
