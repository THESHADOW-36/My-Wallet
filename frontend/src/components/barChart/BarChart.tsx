import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Box } from '@mui/material';
import { API } from '../../constant/Network';
import { Url } from '../../constant/Url';

const BarChart = () => {

   const [barChartData, setBarChartData] = useState({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
         {
            label: 'Income by Month',
            data: [],
            backgroundColor: ['#3EB748'],
            borderColor: ['#3EB748'],
            borderWidth: 1,
         },
         {
            label: 'Expenses by Month',
            data: [],
            backgroundColor: ['#991E1A'],
            borderColor: ['#991E1A'],
            borderWidth: 1
         }
      ]
   });

   const paramsObj = { skip: 0, limit: 0 };
   const myToken = localStorage.getItem('MyToken');
   const headers = { Authorization: 'Bearer ' + myToken };

   const getTotalAmount = () => {
      API.get(Url.chartStats, paramsObj, headers)?.subscribe({
         next(res: any) {
            
            const incomeData = Array.from({ length: 12 }, (_, i) => {
               const monthData = res.modifiedIncomeData.find((item: any) => item._id === i + 1);
               return monthData ? monthData.totalIncomes : 0;
            });

            const expenseData = Array.from({ length: 12 }, (_, i) => {
               const monthData = res.modifiedExpenseData.find((item: any) => item._id === i + 1);
               return monthData ? monthData.totalExpenses : 0;
            });

            setBarChartData((prevState: any) => ({
               ...prevState,
               datasets: [
                  {
                     ...prevState.datasets[0],
                     data: incomeData
                  },
                  {
                     ...prevState.datasets[1],
                     data: expenseData
                  }
               ]
            }));
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
      getTotalAmount();
   }, [])

   return (
      <Box>
         <Bar data={barChartData} />
      </Box>
   )
}

export default BarChart
