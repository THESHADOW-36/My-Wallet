import React, { useState } from "react";
import { Box, Card, CardContent, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { dashboard, dbChart, dbBarChart, dbChartData, dbChartDataCurrency, dbChartDataLayout, dbChartDataName, dbChartDataYear, dbChartYear, dbKPICash, dbKPIName, dbKPIPaper, dbKPIProgress, dbRecentTable, mwContent, dbRtTableHeadCell, dbRtTableBodyCell, dbKPIContent, dbKPIDetails, dbKPIIcon1, dbKPIIcon2, dbKPIIcon3 } from './DashboardStyle'
import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { barChartExpensesData, barChartIncomeData, barChartLabels, dbChartDataContent, dbRecentTableContent, mwKPIData } from "../data/DbData";
import { AccountBalanceTwoTone, CurrencyExchangeTwoTone, DataSaverOnTwoTone } from "@mui/icons-material";

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
            backgroundColor: ['#3EB748'],
            borderColor: ['#3EB748'],
            borderWidth: 1,
         },
         {
            label: 'Expenses by Month',
            data: barChartExpensesData,
            backgroundColor: ['#991E1A'],
            borderColor: ['#991E1A'],
            borderWidth: 1
         }
      ]
   });


   return (
      <Box sx={dashboard}>
         <Box sx={mwContent}>
            <Grid container spacing={3}>
               <Grid item xs={12} sm={4}>
                  <Paper sx={dbKPIPaper}>
                     <Typography sx={dbKPIName}>Income</Typography>
                     <Divider />
                     
                     <Box sx={dbKPIContent}>
                        <Box sx={dbKPIIcon1}>
                           <AccountBalanceTwoTone sx={{ fontSize: '32px' }} />
                        </Box>
                        <Box sx={dbKPIDetails}>
                           <Typography sx={dbKPICash}>₹ 0,00,000</Typography>
                           {/* <Box sx={dbKPIProgress}>{mwd.bar}</Box> */}
                        </Box>
                     </Box>
                  </Paper>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <Paper sx={dbKPIPaper}>
                     <Typography sx={dbKPIName}>Expenses</Typography>
                     <Divider />
                     
                     <Box sx={dbKPIContent}>
                        <Box sx={dbKPIIcon2}>
                           <CurrencyExchangeTwoTone sx={{ fontSize: '32px' }} />
                        </Box>
                        <Box sx={dbKPIDetails}>
                           <Typography sx={dbKPICash}>₹ 0,00,000</Typography>
                           {/* <Box sx={dbKPIProgress}>{mwd.bar}</Box> */}
                        </Box>
                     </Box>
                  </Paper>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <Paper sx={dbKPIPaper}>
                     <Typography sx={dbKPIName}>Balance</Typography>
                     <Divider />

                     <Box sx={dbKPIContent}>
                        <Box sx={dbKPIIcon3}>
                           <DataSaverOnTwoTone sx={{ fontSize: '34px' }} />
                        </Box>
                        <Box sx={dbKPIDetails}>
                           <Typography sx={dbKPICash}>₹ 0,00,000</Typography>
                           {/* <Box sx={dbKPIProgress}>{mwd.bar}</Box> */}
                        </Box>
                     </Box>
                  </Paper>
               </Grid>
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
               {/* <Typography>Recent Details</Typography> */}
               <TableContainer>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell sx={dbRtTableHeadCell}>Sr.No.</TableCell>
                           <TableCell sx={dbRtTableHeadCell}>Date</TableCell>
                           <TableCell sx={dbRtTableHeadCell}>Name</TableCell>
                           <TableCell sx={dbRtTableHeadCell}>Category</TableCell>
                           <TableCell sx={dbRtTableHeadCell}>Expenses (₹)</TableCell>
                           <TableCell sx={dbRtTableHeadCell}>Payment Method</TableCell>
                        </TableRow>
                     </TableHead>

                     <TableBody>
                        {dbRecentTableContent.map((rtc, index) => (
                           <TableRow key={index}>
                              <TableCell sx={dbRtTableBodyCell}>{rtc.num}</TableCell>
                              <TableCell sx={dbRtTableBodyCell}>{rtc.date}</TableCell>
                              <TableCell sx={dbRtTableBodyCell}>{rtc.name}</TableCell>
                              <TableCell sx={dbRtTableBodyCell}>{rtc.category}</TableCell>
                              <TableCell sx={dbRtTableBodyCell}>{rtc.expenses}</TableCell>
                              <TableCell sx={dbRtTableBodyCell}>{rtc.method}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
               {/* <TablePagination
                  component="div"
                  count={100}
                  page={ }
                  onPageChange={ }
                  rowsPerPage={ }
                  onRowsPerPageChange={ } /> */}
            </Paper>
         </Box>
      </Box>
   )
}

export default Homepage
