import { AppBar, Box, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import { Menu, MoreVertTwoTone } from '@mui/icons-material'
import { WalletLogo } from '../Logo'
import { appBar, logoLayout, logoText, menuBarLogo, menuDotLogo, searchBar, toolBar } from './NavbarStyle'




type toggle = { toggleSidebar: any }

const Navbar = (prop: toggle) => {
   return (
      <Box>
         <AppBar sx={appBar}>
            <Toolbar sx={toolBar}>
               <Box>
                  <IconButton sx={menuBarLogo} onClick={prop.toggleSidebar}><Menu /></IconButton>
                  <IconButton sx={menuDotLogo} onClick={prop.toggleSidebar}><MoreVertTwoTone /></IconButton>
               </Box>
               <Box sx={logoLayout}>
                  <WalletLogo />
                  <Typography sx={logoText}>My Wallet</Typography>
               </Box>
               <TextField sx={searchBar} variant='filled' placeholder='Search...' />
            </Toolbar>
         </AppBar>
      </Box>
   )
}

export default Navbar
