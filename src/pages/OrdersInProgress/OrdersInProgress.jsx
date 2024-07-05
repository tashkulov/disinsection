import React, { useEffect, useState } from 'react';
import { getOrdersInWork } from '../../api/api.js';
import './OrdersInProgress.css';

const OrdersInProgress = () => {
    const [ordersInProgress, setOrdersInProgress] = useState(null);

    useEffect(() => {
        const fetchOrdersInWork = async () => {
            try {
                const response = await getOrdersInWork('894740958', '01.01.2023', '01.02.2023', 'Все города', );
                setOrdersInProgress(response);
            } catch (error) {
                console.error('Ошибка при получении заявок в работе:', error);
            }
        };

        fetchOrdersInWork();
    }, []);

    return (
        <div>
            <h1>Заявки в работе</h1>
            {ordersInProgress && (
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
            )}
        </div>
    );
};

export default OrdersInProgress;
