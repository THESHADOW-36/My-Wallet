import { AccountBalanceTwoTone, CurrencyExchangeTwoTone, DataSaverOnTwoTone } from "@mui/icons-material";
import { Box, LinearProgress } from "@mui/material";

export const mwKPIData = [
   {
      name: 'Income',
      cash: '₹ 0,00,000',
      // logo:
      //    <Box sx={{ backgroundImage: 'radial-gradient(#66d95a 0%, #48cd31 50%, #1b8200 100%)', borderRadius: '50%', width: '54px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
      //       <AccountBalanceTwoTone sx={{ fontSize: '32px' }} />
      //    </Box>,
      bar:
         <Box>
            <LinearProgress variant='determinate' value={90} color='inherit' sx={{ color: '#3EB748' }} />
            <LinearProgress variant='determinate' value={90} color='inherit' sx={{ color: '#3EB748' }} />
            {/* <LinearProgress variant='determinate' value={90} color='inherit' sx={{ color: '#3EB748' }} /> */}
         </Box>,
      // today: 'Today',
      // todayCash: '₹ 0,00,000',
      // thisMonth: 'This Month',
      // thisMonthCash: '₹ 0,00,000'
   },
   {
      name: 'Expenses',
      cash: '₹ 0,00,000',
      // logo:
      //    <Box sx={{ backgroundImage: 'radial-gradient( #FDD819 10%, #E80505 100%)', borderRadius: '50%', width: '54px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
      //       <CurrencyExchangeTwoTone sx={{ fontSize: '32px' }} />
      //    </Box>,
      bar:
         <Box>
            <LinearProgress variant='determinate' value={60} color='inherit' sx={{ color: '#991E1A' }} />
            <LinearProgress variant='determinate' value={60} color='inherit' sx={{ color: '#991E1A' }} />
            {/* <LinearProgress variant='determinate' value={60} color='inherit' sx={{ color: '#991E1A' }} /> */}
         </Box>,
      // today: 'Today',
      // todayCash: '₹ 0,00,000',
      // thisMonth: 'This Month',
      // thisMonthCash: '₹ 0,00,000'
   },
   {
      name: 'Balance',
      cash: '₹ 0,00,000',
      // logo:
      //    <Box sx={{ backgroundImage: 'radial-gradient( #52E5E7 10%, #130CB7 100%)', borderRadius: '50%', width: '54px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
      //       <DataSaverOnTwoTone sx={{ fontSize: '34px' }} />
      //    </Box>,
      bar:
         <Box>
            <LinearProgress variant='determinate' value={30} color='inherit' sx={{ color: '#4B70E6' }} />
            <LinearProgress variant='determinate' value={30} color='inherit' sx={{ color: '#4B70E6' }} />
            {/* <LinearProgress variant='determinate' value={30} color='inherit' sx={{ color: '#4B70E6' }} /> */}
         </Box>,
      // today: 'Today',
      // todayCash: '₹ 0,00,000',
      // thisMonth: 'This Month',
      // thisMonthCash: '₹ 0,00,000'
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
      method: 'Credit Card',
   },
   {
      num: '2',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Debit Card',
   },
   {
      num: '3',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'UPI',
   },
   {
      num: '4',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Cash',
   },
   {
      num: '5',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card',
   },
   {
      num: '6',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Debit Card',
   },
   {
      num: '7',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'UPI',
   },
   {
      num: '8',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Cash',
   },
   {
      num: '9',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Credit Card',
   },
   {
      num: '10',
      date: '01-01-2024',
      name: 'Television',
      category: 'Electronic',
      expenses: '45,000',
      method: 'Debit Card',
   },
]