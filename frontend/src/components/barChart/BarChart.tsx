import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { barChartExpensesData, barChartIncomeData, barChartLabels } from '../../pages/data/DbData';
import { Box } from '@mui/material';
import { API } from '../../constant/Network';
import { Url } from '../../constant/Url';

const BarChart = () => {

   const [barChartList, setBarChartList] = useState([]);
   const [barChartLabel, setBarChartLabel] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
   const [barChartID, setBarChartID] = useState([50000, 58000, 52000, 61000, 70000, 66000, 60000, 50000, 58000, 52000, 61000, 70000, 66000, 64000, 80000]);
   const [barChartED, setBarChartED] = useState([30000, 45000, 40000, 50000, 47000, 55000, 50000, 30000, 45000, 40000, 50000, 47000, 55000, 57000, 80000]);

   const paramsObj = { skip: 0, limit: 0 };
   const myToken = localStorage.getItem('MyToken');
   const headers = { Authorization: 'Bearer ' + myToken };

   const getTotalAmount = () => {
      API.get(Url.chartStats, paramsObj, headers)?.subscribe({
         next(res: any) {
            console.log("res :", res)
            // console.log("res :", res.expenseData.map((exp: any) => { console.log(exp) }))
            setBarChartList(res?.data);
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