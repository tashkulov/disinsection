import React, { useEffect, useState } from 'react';
import { getMastersStat } from '../../api/api.js';
import './MastersStat.css';

const MastersStat = () => {
    const [mastersStat, setMastersStat] = useState(null);

    useEffect(() => {
        const fetchMastersStat = async () => {
            try {
                const response = await getMastersStat('894740958', 'Все города', '01.01.2023', '01.02.2023');
                setMastersStat(response);
            } catch (error) {
                console.error('Ошибка при получении статистики по мастерам:', error);
            }
        };

        fetchMastersStat();
    }, []);

    // Функция для добавления пробелов перед каждым городом
    const formatCities = (citiesString) => {
        return citiesString.split(',').map(city => ` ${city.trim()}`).join(',');
    };

    return (
        <div>
            <h1>Статистика по мастерам</h1>
            {mastersStat && (
                <table className="stat-table">
                    <thead>
                    <tr>
                        <th data-label="Имя мастера">Имя мастера</th>
                        <th data-label="ID">ID</th>
                        <th data-label="Рейтинг">Рейтинг</th>
                        <th data-label="Города">Города</th>
                        <th data-label="Средний чек">Средний чек</th>
                        <th data-label="Количество повторов">Количество повторов</th>
                        <th data-label="Процент повторов">Процент повторов</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mastersStat.statistic.map((master) => (
                        <tr key={master.id}>
                            <td data-label="Имя мастера">{master.master_name}</td>
                            <td data-label="ID">{master.id}</td>
                            <td data-label="Рейтинг">{master.rating}</td>
                            <td data-label="Города">{formatCities(master.city)}</td>
                            <td data-label="Средний чек">{master.average_check}</td>
                            <td data-label="Количество повторов">{master.repetitions_count}</td>
                            <td data-label="Процент повторов">{master.percentage_of_repetitions}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MastersStat;
