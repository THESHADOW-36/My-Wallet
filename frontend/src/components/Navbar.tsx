import React from 'react'
import { AppBar, Box, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'


const appBar = {
   position: 'sticky'
}

const toolBar = {
   display: 'flex',
   justifyContent: 'space-between'
}



const Navbar = () => {
   return (
      <Box>
         <AppBar sx={appBar}>
            <Toolbar sx={toolBar}>
               <IconButton><Menu sx={{ color: 'white' }} /></IconButton>
               <Typography>My Wallet</Typography>
               <TextField />
            </Toolbar>
         </AppBar>
      </Box>
   )
}

export default Navbar
