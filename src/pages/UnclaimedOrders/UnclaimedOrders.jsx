import React, { useEffect, useState } from 'react';
import { getUnclaimedOrders } from '../../api/api.js';
import './UnclaimedOrders.css';

const UnclaimedOrders = () => {
    const [unclaimedOrders, setUnclaimedOrders] = useState(null);

    useEffect(() => {
        const fetchUnclaimedOrders = async () => {
            try {
                const response = await getUnclaimedOrders('603461190', '01.01.2024', '07.07.2024', 'Все города');
                setUnclaimedOrders(response);
            } catch (error) {
                console.error('Ошибка при получении непринятых заказов:', error);
            }
        };

        fetchUnclaimedOrders();
    }, []);

    const handlePickOrder = (orderId) => {
        console.log(`Назначить заказ на себя: ${orderId}`);
        // Реализовать POST запрос на /api/v1/pick_order
    };

    const handleCancelOrder = (orderId) => {
        console.log(`Отменить заказ: ${orderId}`);
        // Реализовать POST запрос на /api/v1/cancel_vip_order
    };

    const getStatusLabel = (statusCode) => {
        switch (statusCode) {
            case 0: return { label: 'Завтра', color: 'green' };
            case 1: return { label: 'Сегодня', color: 'yellow' };
            case 2: return { label: 'Задержка', color: 'brown' };
            case 3: return { label: 'Просрочено', color: 'red' };
            default: return { label: 'Неизвестный статус', color: 'grey' };
        }
    };

    if (!unclaimedOrders) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>Непринятые заказы</h1>

            <h2>Список городов</h2>
            <ul>
                {unclaimedOrders.cities.map((city, index) => {
                    const cityOrders = unclaimedOrders.orders.filter(order => order.city === city);
                    const highestStatus = cityOrders.reduce((max, order) => Math.max(max, order.status_code), 0);
                    const status = getStatusLabel(highestStatus);

                    return (
                        <li key={index} className="city-item">
                            <div>{city}</div>
                            <div>{`Сумма заказа: ${cityOrders.reduce((total, order) => total + order.starting_price, 0)}`}</div>

                            <button className="status-button" style={{ backgroundColor: status.color }}>
                                {status.label}
                            </button>
                        </li>
                    );
                })}
            </ul>

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
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {unclaimedOrders.orders.map((order) => {
                        const status = getStatusLabel(order.status_code);
                        return (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.datetime}</td>
                                <td>{order.city}</td>
                                <td>{order.starting_price}</td>
                                <td>{status.label}</td>
                                <td>
                                    <button
                                        onClick={() => handleCancelOrder(order.order_id)}
                                        disabled={!order.vip_order}
                                    >
                                        В общее распределение
                                    </button>
                                    <button
                                        onClick={() => handlePickOrder(order.order_id)}
                                        disabled={!order.pick_order_button_active}
                                    >
                                        Назначить на себя
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            ) : (
                <div>Нет непринятых заказов.</div>
            )}
        </div>
    );
};

export default UnclaimedOrders;
