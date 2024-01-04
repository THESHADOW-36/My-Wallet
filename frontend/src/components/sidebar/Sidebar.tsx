import { Avatar, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { dProEmail, dProName, dProText, dProfile, drawer, mdListButton, mdListIcon, mdProfile, miniDrawer } from './SidebarStyle'
import { sbList1 } from '../data/SidebarData'


interface sbToggle {
   sidebarToggle: any,
   setSidebarToggle: any,
   toggleSidebar: any
}

const Sidebar = (prop: sbToggle) => {

   return (
      <Box>
         {prop.sidebarToggle ?
            <Drawer sx={drawer} open={prop.sidebarToggle} onClose={() => prop.setSidebarToggle(false)} variant='permanent'>
               <Toolbar />
               <Box sx={dProfile}>
                  <Avatar />
                  <Box sx={dProText}>
                     <Typography sx={dProName}>Name</Typography>
                     <Typography sx={dProEmail}>xyz@gmail.com</Typography>
                  </Box>
               </Box>

               <List>
                  {sbList1.map((sbl, index) => (
                     <ListItemButton key={index}>
                        <ListItemIcon>{sbl.logo}</ListItemIcon>
                        <ListItemText>{sbl.name}</ListItemText>
                     </ListItemButton>
                  ))}
               </List>
            </Drawer>
            :
            <Drawer sx={miniDrawer} open={prop.sidebarToggle} onClose={() => prop.setSidebarToggle(false)} variant='permanent'>
               <Toolbar />
               <Box sx={mdProfile}>
                  <Avatar />
               </Box>

               <List>
                  {sbList1.map((sbl, index) => (
                     <ListItemButton sx={mdListButton} key={index}>
                        <ListItemIcon sx={mdListIcon}>{sbl.logo}</ListItemIcon>
                     </ListItemButton>
                  ))}
               </List>
            </Drawer>
         }
      </Box>
   )
}

export default Sidebar
