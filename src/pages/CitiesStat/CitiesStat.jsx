import React, { useEffect, useState } from 'react';
import { getCitiesStat } from '../../api/api.js';
import './CitiesStat.css';

const CitiesStat = () => {
    const [citiesStat, setCitiesStat] = useState(null);

    useEffect(() => {
        const fetchCitiesStat = async () => {
            try {
                const response = await getCitiesStat('894740958', 'Все города', '01.01.2024', '30.06.2024');
                setCitiesStat(response);
            } catch (error) {
                console.error('Ошибка при получении статистики по городам:', error);
            }
        };

        fetchCitiesStat();
    }, []);

    if (!citiesStat) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>Статистика по городам</h1>
            <h2>Общий средний чек: {citiesStat.total_average_check}</h2>
            {citiesStat && (
                <table className="stat-table">
                    <thead>
                    <tr>
                        <th>Город</th>
                        <th>Средний чек</th>
                        <th>Количество повторов</th>
                        <th>Процент повторов</th>
                    </tr>
                    </thead>
                    <tbody>
                    {citiesStat.statistic.map((city, index) => (
                        <tr key={index}>
                            <td data-label="Город">{city.city}</td>
                            <td data-label="Средний чек">{city.average_check}</td>
                            <td data-label="Количество повторов">{city.repetitions_count}</td>
                            <td data-label="Процент повторов">{city.percentage_of_repetitions}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CitiesStat;
