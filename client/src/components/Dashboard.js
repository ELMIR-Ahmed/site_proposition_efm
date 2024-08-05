import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Layout from './Layout';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: 'rgba(0, 0, 0, 0.5)',
      }
    },
    y: {
      grid: {
        drawBorder: false,
        color: function(context) {
          if (context.tick.value === 0) {
            return 'rgba(0, 0, 0, 0.5)';
          } else {
            return 'transparent';
          }
        }
      },
      ticks: {
        color: 'rgba(0, 0, 0, 0.5)',
      }
    }
  },
  plugins: {
    legend: {
      display: true,
    }
  }
};

const chartDataHours = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: [12, 19, 17, 20, 18, 21, 22, 23, 24, 25, 26, 27],
      backgroundColor: '#930e0e',
    },
  ],
};

const doughnutData = {
  labels: ['Analysis', 'Other'],
  datasets: [
    {
      data: [20, 80],
      backgroundColor: ['#930e0e', '#e0e0e0'],
    },
  ],
};

const doughnutOptions = {
  plugins: {
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.label + ': ' + tooltipItem.raw + '%';
        }
      }
    },
    doughnutlabel: {
      labels: [
        {
          text: '20%',
          font: {
            size: '20',
            weight: 'bold'
          },
          color: '#930e0e'
        }
      ]
    }
  }
};

moment.locale('fr'); // Set moment to use the French locale
const localizer = momentLocalizer(moment);

const eventsData = [
  {
    id: 1,
    title: 'Révision',
    description: 'Révision du véhicule',
    start: new Date(2024, 4, 25, 10, 0),
    end: new Date(2024, 4, 25, 12, 0),
  },
  {
    id: 2,
    title: 'Maintenance',
    description: 'Maintenance préventive',
    start: new Date(2024, 4, 27, 14, 0),
    end: new Date(2024, 4, 27, 16, 0),
  },
];

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const handleNavigate = (action) => {
    setDate(action);
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Nombre clients par mois
                </Typography>
                <Box sx={{ height: 220 }}>
                  <Bar options={chartOptions} data={chartDataHours} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Taux des planings des interventions
                </Typography>
                <Box sx={{ height: 220, display: 'flex', justifyContent: 'center' }}>
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }} gutterBottom>
              Last 7 Days Calendar
            </Typography>
            <Calendar
              localizer={localizer}
              events={eventsData}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              date={date}
              onNavigate={handleNavigate}
              view="week"
              min={new Date(moment().subtract(7, 'days'))}
              max={new Date()}
            />
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default Dashboard;
