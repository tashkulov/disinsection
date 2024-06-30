import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MastersStat.css'; // Import the CSS file

const MastersStat = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://31.129.103.253:8001/api/v1/masters-stat', {
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
            <h2>Статистика по мастерам</h2>
            <div>Средний чек по всем мастерам: {data.total_average_check}</div>
            <table className="stat-table">
                <thead>
                <tr>
                    <th>Имя мастера</th>
                    <th>Рейтинг</th>
                    <th>Город</th>
                    <th>Средний чек</th>
                    <th>Повторные заявки</th>
                    <th>% Повторных заявок</th>
                </tr>
                </thead>
                <tbody>
                {data.statistic.map((master, index) => (
                    <tr key={index}>
                        <td>{master.master_name}</td>
                        <td>{master.rating}</td>
                        <td>{master.city}</td>
                        <td>{master.average_check}</td>
                        <td>{master.repetitions_count}</td>
                        <td>{master.percentage_of_repetitions}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MastersStat;
