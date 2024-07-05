import React, { useEffect, useState } from 'react';
import { getUnclaimedOrders } from '../../api/api.js';
import './UnclaimedOrders.css';

const UnclaimedOrders = () => {
    const [unclaimedOrders, setUnclaimedOrders] = useState(null);

    useEffect(() => {
        const fetchUnclaimedOrders = async () => {
            try {
                const response = await getUnclaimedOrders('894740958','01.01.2023', '01.02.2023','Все города');
                setUnclaimedOrders(response);
            } catch (error) {
                console.error('Ошибка при получении непринятых заказов:', error);
            }
        };

        fetchUnclaimedOrders();
    }, []);

    return (
        <div>
            <h1>Непринятые заказы</h1>
            {unclaimedOrders && (
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
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.city}</td>
                            <td>{order.amount}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UnclaimedOrders;
