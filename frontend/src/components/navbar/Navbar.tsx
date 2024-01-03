import { AppBar, Box, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { WalletLogo } from '../Logo'
import { appBar, logoLayout, logoText, menuLogo, searchBar, toolBar } from './NavbarStyle'




type toggle = { toggleSidebar: any }

const Navbar = (prop: toggle) => {
   return (
      <Box>
         <AppBar sx={appBar}>
            <Toolbar sx={toolBar}>
               <IconButton sx={menuLogo} onClick={prop.toggleSidebar}><Menu /></IconButton>
               <Box sx={logoLayout} onClick={prop.toggleSidebar}>
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
