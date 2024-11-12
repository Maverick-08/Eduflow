import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AttendanceAnalytics() {
    const [totalStudent, setTotalStudent] = useState(0);
    const [attendanceMap, setAttendanceMap] = useState([]);

    useEffect(() => {
        const getAnalytics = async () => {
            const path = window.location.pathname;
            const classString = path.split("/");
            const classId = classString[classString.length - 1];
            try {
                const response = await axios.post(`http://localhost:3000/analytics/attendance`, {
                    classId
                }, {
                    withCredentials: true
                });
                setTotalStudent(response.data.totalStrength);
                setAttendanceMap(response.data.attendanceMap);
                console.log("response is :: ", response);
            } catch (error) {
                console.log(error);
            }
        };
        getAnalytics();
    }, []); // Dependency array to avoid continuous re-rendering

    // Prepare data for the chart
    const labels = attendanceMap.map(item => dayjs(item.date).format('MMM D, YYYY'));
    const dataCounts = attendanceMap.map(item => Number(item.count));

    const data = {
        labels,
        datasets: [
            {
                label: 'Attendance Count',
                data: dataCounts,
                backgroundColor: 'lightgreen',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 0.5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Attendance Analytics (Total Students: ${totalStudent})`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: parseInt(totalStudent) + 1,
            },
        },
    };

    return (
        <center>
            <b className='text-blue-600' style={{fontSize : "30px"}}>Attendance Analytics</b>
            <div style={{ width: '80%', maxWidth: '600px' }}>
                <Bar data={data} options={options} />
            </div>
        </center>
    );
}
