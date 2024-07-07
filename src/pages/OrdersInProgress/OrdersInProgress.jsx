import React, { useEffect, useState } from 'react';
import { getOrdersInWork } from '../../api/api.js';
import './OrdersInProgress.css';

const OrdersInProgress = () => {
    const [ordersInProgress, setOrdersInProgress] = useState(null);

    useEffect(() => {
        const fetchOrdersInWork = async () => {
            try {
                const response = await getOrdersInWork('603461190', '07.01.2024', '30.06.2024', 'Все города');
                setOrdersInProgress(response);
            } catch (error) {
                console.error('Ошибка при получении заявок в работе:', error);
            }
        };

        fetchOrdersInWork();
    }, []);

    const getStatusLabel = (status) => {
        switch (status) {
            case 'В работе':
                return { label: 'В работе', color: 'green' };
            case 'На паузе':
                return { label: 'На паузе', color: 'yellow' };
            case 'Завершено':
                return { label: 'Завершено', color: 'grey' };
            default:
                return { label: 'Неизвестный статус', color: 'grey' };
        }
    };

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
                        <th>Сумма</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersInProgress.orders.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.datetime}</td>
                            <td>{order.city}</td>
                            <td>{order.master_name}</td>
                            <td style={{ color: getStatusLabel(order.order_status_title).color }}>
                                {getStatusLabel(order.order_status_title).label}
                            </td>
                            <td>{order.starting_price}</td>
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
