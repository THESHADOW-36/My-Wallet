import { Box, Divider, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { dashboard, dbGraph, dbKPICash, dbKPIName, dbKPIPaper, dbKPIProgress, mwContent } from './DashboardStyle'
// import { useEffect, useState } from 'react'





const mwData = [
   {
      name: 'Income',
      cash: '₹ 0,00,000',
      logo: '',
      bar: ''
   },
   {
      name: 'Expenses',
      cash: '₹ 0,00,000',
      logo: '',
      bar: ''
   },
   {
      name: 'Balance',
      cash: '₹ 0,00,000',
      logo: '',
      bar: ''
   },
]



const Homepage = () => {
   // const [progress, setProgress] = useState(0);

   // useEffect(() => {
   //    setInterval(() => {
   //       setProgress((preProg) => (preProg >= 100 ? 0 : preProg + 10))
   //    }, 800)
   // }, [])

   return (
      <Box sx={dashboard}>
         <Box sx={mwContent}>
            <Grid container spacing={3}>
               {mwData.map((mwd, index) => (
                  <Grid item xs={4}>
                     <Paper sx={dbKPIPaper} key={index} >
                        <Typography sx={dbKPIName}>{mwd.name}</Typography>
                        <Divider />
                        <Typography sx={dbKPICash}>{mwd.cash}</Typography>
                        <Box sx={dbKPIProgress}>
                           {/* <CircularProgress variant='determinate' value={progress} sx={{ fontSize: '30px' }} /> */}
                           <LinearProgress variant='determinate' color='inherit' />
                           <LinearProgress variant='determinate' color='inherit' />
                           <LinearProgress variant='determinate' color='inherit' />
                        </Box>
                     </Paper>
                  </Grid>
               ))}
            </Grid>

            <Paper sx={dbGraph}>
               Graph
            </Paper>
         </Box>
      </Box>
   )
}

export default Homepage
