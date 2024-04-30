import { useEffect, useState } from "react";
import { Box, Card, CardContent, Divider, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { dashboard, dbChart, dbBarChart, dbChartData, dbChartDataCurrency, dbChartDataLayout, dbChartDataName, dbChartDataYear, dbChartYear, dbKPICash, dbKPIName, dbKPIPaper, dbRecentTable, mwContent, dbRtTableHeadCell, dbRtTableBodyCell, dbKPIContent, dbKPIDetails, dbKPIIcon1, dbKPIIcon2, dbKPIIcon3, dbChartLayout, tablePagination, tablePaginationText, dbRecentTableContainer, dbTableContent } from './DashboardStyle'
import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { barChartExpensesData, barChartIncomeData, barChartLabels, dbChartDataContent } from "../data/DbData";
import { AccountBalanceTwoTone, CurrencyExchangeTwoTone, DataSaverOnTwoTone } from "@mui/icons-material";
// import { mwExpData } from "../data/MyWalletData";
import { API } from "../../constant/Network";
import { Url } from "../../constant/Url";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

interface AccData {
   exp: number;
   income: number;
   bal: number;
}
interface ExpDataDB {
   _id: string;
   date: number;
   name: string;
   category: string;
   amount: number | null | undefined;
   payMethod: string;
}


const Homepage: React.FC = () => {
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

   const [expDataDB, setExpDataDB] = useState<ExpDataDB[]>([])
   const [accData, setAccData] = useState<AccData>({ exp: 0, income: 0, bal: 0 });
   console.log("expDataDB :", expDataDB)

   const paramsObj = { skip: 0, limit: 0 };
   const myToken = localStorage.getItem('MyToken');
   const headers = { Authorization: 'Bearer ' + myToken };

   const accountDetails = () => {
      API.get(Url.stats, {}, headers)?.subscribe({
         next(res: any) {
            setAccData({
               exp: res.expStats[0] ? res.expStats[0].totalExp : 0,
               income: res.incomeStats[0] ? res.incomeStats[0].totalIncome : 0,
               bal: res.balStats
            });
            // console.log("res.expStats :", res.expStats[0]?.totalExp)
            // console.log("res.incomeStats :", res.incomeStats[0]?.totalIncome)
         },
         error: (error: any) => {
            console.log('Error:', error.message);
         },
         complete: () => {
            console.log('Completed');
         }
      })
   }
   const getExpData = () => {
      API.get(Url.getExp, paramsObj, headers)?.subscribe({
         next(res: any) {
            setExpDataDB(res?.data);
            // console.log("res :", res)
         },
         error: (error: any) => {
            console.log('Error:', error);
         },
         complete: () => {
            console.log('Completed');
         }
      })
   }

   useEffect(() => {
      accountDetails();
      getExpData();
   }, [])

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
                           <Typography sx={dbKPICash}>₹ {accData.income}</Typography>
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
                           <Typography sx={dbKPICash}>₹ {accData.exp}</Typography>
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
                           <Typography sx={dbKPICash}>₹ {accData.bal}</Typography>
                           {/* <Box sx={dbKPIProgress}>{mwd.bar}</Box> */}
                        </Box>
                     </Box>
                  </Paper>
               </Grid>
            </Grid>

            <Paper sx={dbChartLayout}>
               <Typography sx={dbKPIName}>All Income & Expenses</Typography>
               <Divider />
               <Box sx={dbChart}>
                  <Box sx={dbBarChart}>
                     <Bar data={barChartData} />
                     <Typography sx={dbChartYear}>Year 2024</Typography>
                  </Box>
                  <Box sx={dbChartDataLayout}>
                     <Card sx={dbChartData}>
                        {dbChartDataContent.map((chartData, index) => (
                           <CardContent key={index}>
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
               </Box>
            </Paper>

            <Paper sx={dbRecentTable}>
               <Typography sx={dbKPIName}>Recent Details</Typography>
               <Divider />
               <Box sx={dbRecentTableContainer}>
                  {/* <Box sx={dbTopHeader}>
                     <TextField sx={dbTextField}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position='end'>
                                 <Search sx={{ fontSize: { xs: '20px', sm: '26px', md: '20px' } }} />
                              </InputAdornment>)
                        }}
                        size='small' placeholder='Search...' />
                  </Box> */}
                  <Box sx={dbTableContent}>
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
                              {expDataDB.map((rtc, index) => (
                                 <TableRow key={index}>
                                    <TableCell sx={dbRtTableBodyCell}>{index + 1}</TableCell>
                                    <TableCell sx={dbRtTableBodyCell}>{rtc.date}</TableCell>
                                    <TableCell sx={dbRtTableBodyCell}>{rtc.name}</TableCell>
                                    <TableCell sx={dbRtTableBodyCell}>{rtc.category}</TableCell>
                                    <TableCell sx={dbRtTableBodyCell}>{rtc.amount}</TableCell>
                                    <TableCell sx={dbRtTableBodyCell}>{rtc.payMethod}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                     <Box sx={tablePagination}>
                        <Typography sx={tablePaginationText}>Showing 1 to 10 of 100 Entries</Typography>
                        <Pagination count={10} />
                     </Box>
                  </Box>
               </Box>
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
