import { useState } from 'react'
import { Box } from '@mui/material'
import App from '../App'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'


const mainStyle = {
   fontFamily: 'Roboto, sans-serif',
   // fontFamily: 'Roboto Serif, serif'
   position: 'relative'
}

const mNavbar = {
   color: 'white',
   position: 'sticky',
   top: '0',
   zIndex: (theme: any) => theme.zIndex.drawer + 1
}
const mContent = {
   display: 'flex'
}

const mSidebar = {
   color: 'white',
   minWidth: { xs: '100vw', md: '240px' },
   height: '89.5vh',
   position: { xs: 'fixed', md: 'relative' },
   zIndex: '10'
   // transition: '1s',
   // transitionProperty: 'width',
   // transitionTimingFunction: 'ease-out'
}

const mMiniSidebar = {
   color: 'white',
   minWidth: '60px',
   height: '89.5vh',
   display: { xs: 'none', md: 'block', }
}

const mApp = {
   backgroundColor: '#E5E5CB',
   // backgroundImage: `url(${"https://media.istockphoto.com/id/1368169112/vector/money-green-seamless-pattern-vector-background-included-line-icons-as-piggy-bank-wallet.jpg?s=612x612&w=0&k=20&c=qjIUpnUPtiKGBgLnXGLQ_4qQUq36OvP82DIFTAdch70="})`,
   width: '100%',
   // height: '89.5vh'
}


const Main = () => {
   const [sidebarToggle, setSidebarToggle] = useState(true)
   console.log(sidebarToggle)

   const [loggedIn, setLoggedIn] = useState(true)

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
               <Box>
                  {loggedIn &&
                     <Box sx={mSidebar} id='sideBar'>
                        <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} toggleSidebar={toggleSidebar} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                     </Box>
                  }
               </Box>
               :
               <Box>
                  {loggedIn &&
                     <Box sx={mMiniSidebar} id='sideBar'>
                        <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} toggleSidebar={toggleSidebar} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                     </Box>
                  }
               </Box>
            }
            <Box sx={mApp}>
               <App loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </Box>
         </Box>
      </Box>
   )
}

export default Main
