import { useState } from 'react'
import { Box } from '@mui/material'
import App from '../App'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'


const mainStyle = {
   fontFamily: 'Roboto, sans-serif',
   // fontFamily: 'Roboto Serif, serif'
}

const mNavbar = {
   color: 'white',
}
const mContent = {
   display: 'flex'
}

const mSidebar = {
   color: 'white',
   minWidth: '240px',
   height: '89.5vh',
   // transition: '1s',
   // transitionProperty: 'width',
   // transitionTimingFunction: 'ease-out'
}

const mMiniSidebar = {
   color: 'white',
   minWidth: '60px',
   height: '89.5vh',
}

const mApp = {
   backgroundColor: '#E5E5CB',
   width: '100%',
   height: '89.5vh'
}


const Main = () => {
   const [sidebarToggle, setSidebarToggle] = useState(true)
   console.log(sidebarToggle)
   function toggleSidebar() {
      setSidebarToggle(!sidebarToggle)
   }
   return (
      <Box sx={mainStyle}>
         <Box sx={mNavbar}>
            <Navbar toggleSidebar={toggleSidebar} />
         </Box>
         <Box sx={mContent}>
            {sidebarToggle ?
               <Box sx={mSidebar} id='sideBar'>
                  <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} toggleSidebar={toggleSidebar} />
               </Box>
               :
               <Box sx={mMiniSidebar} id='sideBar'>
                  <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} toggleSidebar={toggleSidebar} />
               </Box>
            }
            <Box sx={mApp}>
               <App />
            </Box>
         </Box>
      </Box>
   )
}

export default Main
