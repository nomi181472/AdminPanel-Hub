// Note: Dashboard page/screen...!

"use client";

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import MonthlySaleIcon from '@mui/icons-material/Receipt';
import UsersIcon from '@mui/icons-material/People';
import OrdersIcon from '@mui/icons-material/FactCheck';
import BugReportIcon from '@mui/icons-material/BugReport';

// Register all necessary components for Chart.js
Chart.register(...registerables);

const Dashboard = () => {
    return (
        <Box display="flex" flexDirection="column" gap={3} p={3}>
            {/* Top Statistics Cards */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                gap={{ xs: 2, md: 3 }} // Adjust the gap for mobile and desktop
                paddingTop={5}
            >
                {
                    [
                        { title: 'Monthly sale for September', value: '714k', icon: <MonthlySaleIcon /> },
                        { title: 'New Users', value: '1.35k', icon: <UsersIcon /> },
                        { title: 'New Item Orders', value: '514k', icon: <OrdersIcon /> },
                        { title: 'Reported Bug Issues', value: '234', icon: <BugReportIcon /> },
                    ].map((stat, index) => (
                        <Paper
                            key={index}
                            elevation={3}
                            sx={{
                                p: { xs: 2, md: 4 }, // Adjust padding for mobile and desktop
                                flex: '1 1 auto',
                                minWidth: { xs: '100%', md: '22%' }, // 100% width on mobile, 22% on desktop
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                                {stat.icon}
                                <Typography variant="h5">{stat.value}</Typography>
                            </Box>
                            
                            <Typography variant="subtitle2" textAlign="center">
                                {stat.title}
                            </Typography>
                        </Paper>
                    ))
                }
            </Box>

            {/* Charts in a Row or Column */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', lg: 'row' }} // Column on mobile, row on larger screens
                justifyContent="space-between"
                gap={{ xs: 2, md: 3 }} // Adjust the gap for mobile and desktop
            >
                {/* Total Sales Graph */}
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 6, md: 12 }, // Adjust padding for mobile and desktop
                        flex: '1 1 auto',
                        height: { xs: '300px', lg: '500px' }, // Adjust the height for mobile and desktop
                        width: { xs: '100%', lg: '48%' }, // Full width on mobile, 48% on larger screens
                        mb: { xs: 2, lg: 0 } // Add margin at the bottom for mobile
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Total Sales
                    </Typography>

                    <Bar
                        data={{
                            labels: ['Jan-Feb', 'Mar-Apr', 'May-Jun', 'Jul-Aug', 'Sept-Oct'],
                            datasets: [
                                {
                                    label: 'Sales',
                                    data: [20, 30, 40, 25, 35],
                                    backgroundColor: '#333',
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // Ensure chart adapts to container size
                            scales: {
                                y: { beginAtZero: true },
                            },
                        }}
                    />
                </Paper>

                {/* Most Frequently Sold Items Pie Chart */}
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 6, md: 12 }, // Adjust padding for mobile and desktop
                        flex: '1 1 auto',
                        height: { xs: '300px', lg: '500px' }, // Adjust the height for mobile and desktop
                        width: { xs: '100%', lg: '48%' }, // Full width on mobile, 48% on larger screens
                        mb: { xs: 2, lg: 0 } // Add margin at the bottom for mobile
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Most Frequently Sold Items
                    </Typography>

                    <Pie
                        data={{
                            labels: ['Laptops', 'Computers', 'Mobiles'],
                            datasets: [
                                {
                                    data: [35, 45, 20],
                                    backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                    <Box display="flex" justifyContent="space-around" mt={2}>
                        <Typography>Laptops</Typography>
                        <Typography>Computers</Typography>
                        <Typography>Mobiles</Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Dashboard;