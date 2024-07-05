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

    return (
        <div>
            <h1>Статистика по мастерам</h1>
            {mastersStat && (
                <table className="stat-table">
                    <thead>
                    <tr>
                        <th>Имя мастера</th>
                        <th>ID</th>
                        <th>Рейтинг</th>
                        <th>Города</th>
                        <th>Средний чек</th>
                        <th>Количество повторов</th>
                        <th>Процент повторов</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mastersStat.statistic.map((master) => (
                        <tr key={master.id}>
                            <td>{master.master_name}</td>
                            <td>{master.id}</td>
                            <td>{master.rating}</td>
                            <td>{master.city}</td>
                            <td>{master.average_check}</td>
                            <td>{master.repetitions_count}</td>
                            <td>{master.percentage_of_repetitions}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MastersStat;
