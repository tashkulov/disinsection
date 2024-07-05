import React, { useEffect, useState } from 'react';
import { getCitiesStat } from '../../api/api.js';
import './CitiesStat.css';

const CitiesStat = () => {
    const [citiesStat, setCitiesStat] = useState(null);

    useEffect(() => {
        const fetchCitiesStat = async () => {
            try {
                const response = await getCitiesStat('894740958', 'Все города', '01.01.2023', '01.02.2023');
                setCitiesStat(response);
            } catch (error) {
                console.error('Ошибка при получении статистики по городам:', error);
            }
        };

        fetchCitiesStat();
    }, []);

    return (
        <div>
            <h1>Статистика по городам</h1>
            {citiesStat && (
                <table className="stat-table">
                    <thead>
                    <tr>
                        <th>Город</th>
                        <th>Количество заявок</th>
                        <th>Средний чек</th>
                        <th>Количество повторов</th>
                        <th>Процент повторов</th>
                    </tr>
                    </thead>
                    <tbody>
                    {citiesStat.statistic.map((city) => (
                        <tr key={city.id}>
                            <td>{city.city_name}</td>
                            <td>{city.order_count}</td>
                            <td>{city.average_check}</td>
                            <td>{city.repetitions_count}</td>
                            <td>{city.percentage_of_repetitions}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CitiesStat;
