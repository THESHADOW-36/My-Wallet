import { Box, LinearProgress } from "@mui/material";

export const mwKPIData = [
   {
      name: 'Income',
      cash: '₹ 0,00,000',
      logo: '',
      bar:
         <Box>
            <LinearProgress variant='determinate' value={90} color='inherit' sx={{ color: '#00C914' }} />
            <LinearProgress variant='determinate' value={90} color='inherit' sx={{ color: '#00C914' }} />
            <LinearProgress variant='determinate' value={90} color='inherit' sx={{ color: '#00C914' }} />
         </Box>
   },
   {
      name: 'Expenses',
      cash: '₹ 0,00,000',
      logo: '',
      bar:
         <Box>
            <LinearProgress variant='determinate' value={60} color='inherit' sx={{ color: '#B30600' }} />
            <LinearProgress variant='determinate' value={60} color='inherit' sx={{ color: '#B30600' }} />
            <LinearProgress variant='determinate' value={60} color='inherit' sx={{ color: '#B30600' }} />
         </Box>
   },
   {
      name: 'Balance',
      cash: '₹ 0,00,000',
      logo: '',
      bar:
         <Box>
            <LinearProgress variant='determinate' value={30} color='inherit' sx={{ color: '#2347BD' }} />
            <LinearProgress variant='determinate' value={30} color='inherit' sx={{ color: '#2347BD' }} />
            <LinearProgress variant='determinate' value={30} color='inherit' sx={{ color: '#2347BD' }} />
         </Box>
   },
]

export const barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const barChartIncomeData = [50000, 58000, 52000, 61000, 70000, 66000, 60000, 50000, 58000, 52000, 61000, 70000, 66000, 64000, 80000]

export const barChartExpensesData = [30000, 45000, 40000, 50000, 47000, 55000, 50000, 30000, 45000, 40000, 50000, 47000, 55000, 57000, 80000]

export const dbChartDataContent = [
   {
      month: 'January 2024',
      income: 'Income',
      incomeCurrency: '₹ 0,00,000',
      expenses: 'Expenses',
      expensesCurrency: '₹ 0,00,000',
      profit: 'Profit',
      profitCurrency: '₹ 0,00,000',
      loss: 'Loss',
      lossCurrency: '₹ 0,00,000'

   },
   // {
   //    name: 'Income',
   //    currency: '₹ 0,00,000',

   // },
   // {
   //    name: 'Expenses',
   //    currency: '₹ 0,00,000'
   // },
   // {
   //    name: 'Profit',
   //    currency: '₹ 0,00,000'
   // },
   // {
   //    name: 'Loss',
   //    currency: '₹ 0,00,000'
   // }
]

export const dbRecentTableContent = [
   {
      num: '1',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
   {
      num: '2',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
   {
      num: '3',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
   {
      num: '4',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
   {
      num: '5',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
   {
      num: '6',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
   {
      num: '7',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
   {
      num: '8',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
   {
      num: '9',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
   {
      num: '10',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card, Debit Card, UPI, Cash',
   },
]