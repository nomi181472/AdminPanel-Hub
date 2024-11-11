// Note: Dashboard page/screen...!

"use client";

import React from 'react';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import MonthlySaleIcon from '@mui/icons-material/Receipt';
import UsersIcon from '@mui/icons-material/People';
import OrdersIcon from '@mui/icons-material/FactCheck';
import BugReportIcon from '@mui/icons-material/BugReport';
import { customStyles } from '@/styles/styles';
import CountUp from 'react-countup';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Register all necessary components for Chart.js
Chart.register(...registerables);

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={3}
            p={3}
        >
            {/* Note: Top Statistics Cards */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                gap={3}
                paddingTop={5}
            >
                {
                    [
                        { title: `Monthly sale for ${months[new Date().getMonth()]?.substring(0, 3)}`, value: '1000', icon: <MonthlySaleIcon sx={{ color: "white" }} /> },
                        { title: 'New Users', value: '400', icon: <UsersIcon sx={{ color: "white" }} /> },
                        { title: 'New Item Orders', value: '3500', icon: <OrdersIcon sx={{ color: "white" }} /> },
                        { title: 'Reported Bug Issues', value: '235', icon: <BugReportIcon sx={{ color: "white" }} /> },
                    ]
                        .map((stat, index) => (
                            <Paper
                                key={index}
                                elevation={3}
                                sx={{
                                    p: 3,
                                    flex: '1 1 auto',
                                    minWidth: { xs: '100%', sm: 'auto', md: 'auto' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    '& .icon': {
                                        transition: 'transform 0.3s ease',
                                    },
                                    '&:hover .icon': {
                                        transform: 'scale(1.2)',
                                    },
                                    background: 'radial-gradient(circle at 10% 20%, rgb(69, 86, 102) 0%, rgb(34, 34, 34) 90%)',
                                    color: customStyles.colors.white
                                }}
                            >
                                <Box
                                    display="flex"
                                    alignItems={customStyles.alignment.center}
                                    gap={1}
                                    mb={1}
                                >
                                    {/* {stat.icon} */}
                                    <Box className="icon">
                                        {stat.icon}
                                    </Box>

                                    <Typography variant="h5" fontSize={{ xs: '1.25rem', md: '1.5rem' }} sx={{ color: "white" }}>
                                        <CountUp
                                            end={stat?.value}
                                            duration={3}
                                        />
                                    </Typography>
                                </Box>

                                <Typography variant="subtitle2" fontSize={{ xs: '0.875rem', md: '1rem' }} sx={{ color: "white" }}>
                                    {stat.title}
                                </Typography>
                            </Paper>
                        ))}
            </Box>

            {/* Charts Section */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', lg: 'row' }}
                justifyContent={customStyles.alignment.spaceBetween}
                gap={3}
            >
                {/* Total Sales Graph */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        flex: '1 1 auto',
                        height: { xs: '400px', lg: '500px' },
                        width: '100%',
                        maxWidth: { lg: '50%' },
                        mb: { xs: 2, lg: 0 },
                        backgroundColor: "#F2F2F2"
                    }}
                >
                    <Typography
                        variant="h6"
                        mb={2}
                        fontSize={{
                            xs: '1rem',
                            md: '1.25rem'
                        }}
                    >
                        Total Sales
                    </Typography>

                    <Box
                        sx={{
                            position: customStyles.position.relative,
                            height: '90%',
                            width: '100%',
                            maxHeight: { xs: '200px', md: '350px' },
                            display: 'flex',
                            alignItems: customStyles.alignment.center,
                            justifyContent: customStyles.alignment.center
                        }}
                    >
                        <Bar
                            data={{
                                labels: ['Jan-Feb', 'Mar-Apr', 'May-Jun', 'Jul-Aug', 'Sept-Oct'],
                                datasets: [
                                    {
                                        label: 'Sales',
                                        data: [20, 30, 40, 25, 35],
                                        backgroundColor: function (context) {
                                            const gradient = context.chart.ctx.createRadialGradient(10, 20, 0, 10, 20, context.chart.width / 2);
                                            gradient.addColorStop(0, "#7998b3");
                                            gradient.addColorStop(1, 'rgb(34, 34, 34)');
                                            return gradient;
                                        },
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { beginAtZero: true },
                                },
                            }}
                        />
                    </Box>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        flex: '1 1 auto',
                        height: { xs: '400px', lg: '500px' }, // Adjust the height for mobile and desktop
                        width: '100%',
                        maxWidth: { lg: '48%' },
                        mb: { xs: 2, lg: 0 },
                        overflow: 'hidden',
                        backgroundColor: "#F2F2F2"
                    }}
                >
                    <Typography variant="h6" mb={2} fontSize={{ xs: '1rem', md: '1.25rem' }}>
                        Most Frequently Sold Items
                    </Typography>

                    <Box
                        sx={{
                            position: customStyles.position.relative,
                            height: '80%',
                            width: '100%',
                            maxHeight: { xs: '200px', md: '350px' },
                            display: 'flex',
                            alignItems: customStyles.alignment.center,
                            justifyContent: customStyles.alignment.center
                        }}
                    >
                        <Pie
                            data={{
                                labels: ['Laptops', 'Computers', 'Mobiles'],
                                datasets: [
                                    {
                                        data: [35, 45, 20],
                                        backgroundColor: ['#4c6072', '#2a2d32', '#7998b3'],
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="space-around"
                        mt={2}
                        fontSize={{ xs: '0.75rem', md: '1rem' }}
                    >
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