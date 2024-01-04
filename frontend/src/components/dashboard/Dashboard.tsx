import React, { useState } from "react";
import { Box, Card, CardContent, Divider, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { dashboard, dbChart, dbBarChart, dbChartData, dbChartDataCurrency, dbChartDataLayout, dbChartDataName, dbChartDataYear, dbChartYear, dbKPICash, dbKPIName, dbKPIPaper, dbKPIProgress, dbRecentTable, mwContent } from './DashboardStyle'
import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { barChartExpensesData, barChartIncomeData, barChartLabels, dbChartDataContent, dbRecentTableContent, mwKPIData } from "../data/DbData";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);



const Homepage = () => {
   // const [progress, setProgress] = useState(0);

   // useEffect(() => {
   //    setInterval(() => {
   //       setProgress((preProg) => (preProg >= 100 ? 0 : preProg + 10))
   //    }, 800)
   // }, [])

   // eslint-disable-next-line
   const [barChartData, setBarChartData] = useState({
      labels: barChartLabels,
      datasets: [
         {
            label: 'Income by Month',
            data: barChartIncomeData,
            backgroundColor: ['#2D85C5'],
            borderColor: ['#2D85C5'],
            borderWidth: 1,
         },
         {
            label: 'Expenses by Month',
            data: barChartExpensesData,
            backgroundColor: ['#C33726'],
            borderColor: ['#C33726'],
            borderWidth: 1
         }
      ]
   });


   return (
      <Box sx={dashboard}>
         <Box sx={mwContent}>
            <Grid container spacing={3}>
               {mwKPIData.map((mwd, index) => (
                  <Grid item xs={4}>
                     <Paper sx={dbKPIPaper} key={index} >
                        <Typography sx={dbKPIName}>{mwd.name}</Typography>
                        <Divider />
                        <Typography sx={dbKPICash}>{mwd.cash}</Typography>
                        <Box sx={dbKPIProgress}>{mwd.bar}</Box>
                     </Paper>
                  </Grid>
               ))}
            </Grid>

            <Paper sx={dbChart}>
               <Box sx={dbBarChart}>
                  <Bar data={barChartData} />
                  <Typography sx={dbChartYear}>Year 2024</Typography>
               </Box>
               <Box sx={dbChartDataLayout}>
                  <Card sx={dbChartData}>
                     {dbChartDataContent.map((chartData) => (
                        <CardContent>
                           <Typography sx={dbChartDataYear}>{chartData.month}</Typography>
                           <Typography sx={dbChartDataName}>{chartData.income}</Typography>
                           <Typography sx={dbChartDataCurrency}>{chartData.incomeCurrency}</Typography>
                           <Typography sx={dbChartDataName}>{chartData.expenses}</Typography>
                           <Typography sx={dbChartDataCurrency}>{chartData.expensesCurrency}</Typography>
                           <Typography sx={dbChartDataName}>{chartData.profit}</Typography>
                           <Typography sx={dbChartDataCurrency}>{chartData.profitCurrency}</Typography>
                           <Typography sx={dbChartDataName}>{chartData.loss}</Typography>
                           <Typography sx={dbChartDataCurrency}>{chartData.lossCurrency}</Typography>
                        </CardContent>
                     ))}
                  </Card>
               </Box>
            </Paper>

            <Paper sx={dbRecentTable}>
               <TableContainer>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>Sr.No.</TableCell>
                           <TableCell>Date</TableCell>
                           <TableCell>Name</TableCell>
                           <TableCell>Category</TableCell>
                           <TableCell>Expenses (₹)</TableCell>
                           <TableCell>Payment Method</TableCell>
                        </TableRow>
                     </TableHead>

                     <TableBody>
                        {dbRecentTableContent.map((rtc, index) => (
                           <TableRow key={index}>
                              <TableCell>{rtc.num}</TableCell>
                              <TableCell>{rtc.date}</TableCell>
                              <TableCell>{rtc.name}</TableCell>
                              <TableCell>{rtc.category}</TableCell>
                              <TableCell>{rtc.expenses}</TableCell>
                              <TableCell>{rtc.method}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
               {/* <TablePagination></TablePagination> */}
            </Paper>
         </Box>
      </Box>
   )
}

export default Homepage
