import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import GroupsIcon from '@mui/icons-material/Groups';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";
import './index.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total_clients: 0,
        clients_regle: 0,
        clients_en_cours: 0,
        clients_by_status: {},
        monthly_data: {
            months: [],
            regle: [],
            en_cours: []
        }
    });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/client-stats/")
            .then(response => {
                console.log(response.data); 
                setStats(response.data);
            })
            .catch(error => console.error("Error fetching dashboard stats:", error));
    }, []);
    
    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <main className="main-container">
                <div className="main-title">
                    <h3>DASHBOARD</h3>
                </div>

                <div className="main-cards">
                    <div className="card blue-card">
                        <div className="inner-card">
                            <h3>Nombre Total des clients</h3>
                            <GroupsIcon className="card-icon" />
                        </div>
                        <h1>{stats.total_clients}</h1>
                    </div>
                    <div className="card green-card">
                        <div className="inner-card">
                            <h3>Nombre Total des clients réglé</h3>
                            <HowToRegIcon className="card-icon" />
                        </div>
                        <h1>{stats.clients_regle}</h1>
                    </div>
                    <div className="card purple-card">
                        <div className="inner-card">
                            <h3>Nombre Total des clients en cours</h3>
                            <TrendingUpIcon className="card-icon" />
                        </div>
                        <h1>{stats.clients_en_cours}</h1>
                    </div>
                </div>

                <div className="charts">
                    
                    <div className="line-chart-container">
                        <h3 className="chart-title">Évolution mensuelle des clients réglés vs en cours</h3>
                        {stats.monthly_data &&
                            stats.monthly_data.regle &&
                            stats.monthly_data.en_cours &&
                            stats.monthly_data.months.length > 0 ? (
                            <LineChart
                                width={1000}
                                height={300}
                                series={[
                                    { data: stats.monthly_data.regle, label: "Réglé", color: '#233E83' },
                                    { data: stats.monthly_data.en_cours, label: "En cours", color: 'rgba(61, 182, 75, 0.99)' }
                                ]}
                                xAxis={[{ scaleType: 'point', data: stats.monthly_data.months }]}
                            />
                        ) : (
                            <div>Loading line chart...</div>
                        )}
                    </div>

                
                    <div className="bottom-charts">
                       
                        <div className="bar-chart-container">
                            <h3 className="chart-title">Répartition mensuelle des clients</h3>
                            {stats.monthly_data &&
                                stats.monthly_data.regle &&
                                stats.monthly_data.en_cours &&
                                stats.monthly_data.months.length > 0 ? (
                                <BarChart
                                    width={500}
                                    height={300}
                                    series={[
                                        { data: stats.monthly_data.regle, label: "Réglé", color: '#233E83' },
                                        { data: stats.monthly_data.en_cours, label: "En cours", color: 'rgba(61, 182, 75, 0.99)' }
                                    ]}
                                    xAxis={[{ data: stats.monthly_data.months, scaleType: 'band' }]}
                                />
                            ) : (
                                <div>Loading bar chart...</div>
                            )}
                        </div>

                        <div className="pie-chart-container">
                            <h3 className="chart-title">Répartition des clients par statut</h3>
                            {stats.total_clients > 0 ? (
                                <PieChart
                                    series={[{
                                        data: [
                                            { id: 0, value: stats.clients_by_status["Payment Réglé"] || 0, label: 'Réglé', color: '#233E83' },
                                            { id: 1, value: stats.clients_by_status["Paiement en cours"] || 0, label: 'En Cours', color: 'rgba(61, 182, 75, 0.99)' },
                                            { id: 2, value: stats.clients_by_status["Non Traité"] || 0, label: 'Non Traité', color: '#FFA500' },
                                            { id: 3, value: stats.clients_by_status["Juridique"] || 0, label: 'Juridique', color: '#FF6347' },
                                            { id: 4, value: stats.clients_by_status["Huissier"] || 0, label: 'Huissier', color: '#800080' },
                                            { id: 5, value: stats.clients_by_status["Avocat"] || 0, label: 'Avocat', color: '#008B8B' },
                                            { id: 6, value: stats.clients_by_status["Décédé"] || 0, label: 'Décédé', color: '#696969' },
                                        ],
                                        arcLabel: (item) => {
                                            const percentage = ((item.value / stats.total_clients) * 100).toFixed(1);
                                            return `${percentage}%`;
                                        },
                                        arcLabelMinAngle: 20,
                                    }]}
                                    width={600}
                                    height={300}
                                    slotProps={{
                                        legend: {
                                            labelStyle: {
                                                fontSize: 14,
                                                fill: 'inherit',
                                            },
                                        },
                                    }}
                                />
                            ) : (
                                <div>Loading pie chart...</div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;