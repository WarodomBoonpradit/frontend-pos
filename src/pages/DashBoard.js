import React from 'react';
import './DashBoard.css'; // ใช้ CSS แยกสำหรับตกแต่ง

const Header = () => (
    <header className="dashboard-header">
        <h1>Dashboard</h1>
    </header>
);

const Sidebar = () => (
    <aside className="dashboard-sidebar">
        <nav>
            <ul>
                <li><a href="#overview">Overview</a></li>
                <li><a href="#statistics">Statistics</a></li>
                <li><a href="#recent-activities">Recent Activities</a></li>
                <li><a href="#table-summary">Table Summary Payment</a></li>
            </ul>
        </nav>
    </aside>
);

const Overview = () => (
    <section id="overview">
        <h2>Overview</h2>
        <p>Summary of the dashboard content.</p>
    </section>
);

const Statistics = () => (
    <section id="statistics">
        <h2>Statistics</h2>
        <p>Some statistics here.</p>
    </section>
);

const RecentActivities = () => (
    <section id="recent-activities">
        <h2>Recent Activities</h2>
        <p>List of recent activities.</p>
    </section>
);

const TableSummaryPayment = () => (
    <section id="table-summary">
        <h2>Table Summary Payment</h2>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2023-11-01</td>
                    <td>$100</td>
                    <td>Paid</td>
                </tr>
                <tr>
                    <td>2023-11-02</td>
                    <td>$200</td>
                    <td>Pending</td>
                </tr>
            </tbody>
        </table>
    </section>
);

const Footer = () => (
    <footer className="dashboard-footer">
        <p>© 2023 RESTO EZY</p>
    </footer>
);

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-layout">
                <Sidebar />
                <main className="dashboard-content">
                    <Overview />
                    <Statistics />
                    <RecentActivities />
                    <TableSummaryPayment />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
