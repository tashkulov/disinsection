import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnclaimedOrders = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://31.129.103.253:8001/api/v1/not-accepted-leads', {
                params: {
                    user_id: '894740958',
                    start_date: '01.01.2024',
                    end_date: '30.06.2024',
                    city: 'Все города'
                }
            });
            setData(response.data);
        };
        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Не взятые заявки</h2>
            <div>Количество заявок: {data.orders_count}</div>
            <div>Города: {data.cities.join(', ')}</div>
            <div>
                {data.orders.map((order, index) => (
                    <div key={index} className="order">
                        <h3>{order.title}</h3>
                        <div>Город: {order.city}</div>
                        <div>Дата и время выезда: {order.datetime}</div>
                        <div>Адрес: {order.contact_address}</div>
                        <div>Стартовая цена: {order.starting_price}</div>
                        <div>Тип обработки: {order.treatment_type}</div>
                        <div>
                            <button
                                disabled={!order.vip_order}
                                onClick={() => handleCancelVipOrder(order.order_id)}
                            >
                                В общее распределение
                            </button>
                            <button onClick={() => handlePickOrder(order.order_id)}>Назначить на себя</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const handleCancelVipOrder = async (orderId) => {
    await axios.post('http://31.129.103.253:8001/api/v1/cancel_vip_order', {
        order_id: orderId
    });
    // Handle response and update state if needed
};

const handlePickOrder = async (orderId) => {
    await axios.post('http://31.129.103.253:8001/api/v1/pick_order', {
        order_id: orderId,
        user_id: '894740958'
    });
    // Handle response and update state if needed
};

export default UnclaimedOrders;
