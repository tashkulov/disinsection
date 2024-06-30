import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrdersInProgress.css';

const OrdersInProgress = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/orders-in-work?user_id=894740958&start_date=01.01.2024&end_date=30.06.2024&city=Все города')
            .then(response => {
                setData(response.data.orders);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleCancelVipOrder = async (orderId) => {
        await axios.post('https://31.129.103.253:8001/api/v1/cancel_vip_order', {
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

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="orders-in-progress">
            <h1>Заявки в работе</h1>
            <div className="orders-list">
                {data.map(order => (
                    <div className="order" key={order.order_id}>
                        <h2>{order.title}</h2>
                        <p>Город: {order.city}</p>
                        <p>Дата и время: {order.datetime}</p>
                        <p>Адрес: {order.contact_address}</p>
                        <div className="order-actions">
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

export default OrdersInProgress;
