import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CitiesStat = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://31.129.103.253:8001/api/v1/cities-stat', {
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
            <h2>Статистика по городам</h2>
            <div>Средний чек по всем городам: {data.total_average_check}</div>
            <table>
                <thead>
                <tr>
                    <th>Город</th>
                    <th>Средний чек</th>
                    <th>Повторные заявки</th>
                    <th>% Повторных заявок</th>
                </tr>
                </thead>
                <tbody>
                {data.statistic.map((city, index) => (
                    <tr key={index}>
                        <td>{city.city}</td>
                        <td>{city.average_check}</td>
                        <td>{city.repetitions_count}</td>
                        <td>{city.percentage_of_repetitions}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CitiesStat;
