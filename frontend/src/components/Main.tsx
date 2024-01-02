import React from 'react'
import { Box } from '@mui/material'
import App from '../App'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Main = () => {
   return (
      <Box>
         <Navbar />
         <Sidebar />
         <App />
      </Box>
   )
}

export default Main
