
export const appBar = {
   position: 'sticky',
   top: '0',
   backgroundColor: '#191919',
   zIndex: (theme: any) => theme.zIndex.drawer + 1
}

export const toolBar = {
   display: 'flex',
   justifyContent: 'space-between',
}

export const menuBarLogo = {
   color: 'white',
   display: { xs: 'none', md: 'block' },
   margin: '4px 0px 0px 0px',
}

export const menuDotLogo = {
   color: 'white',
   display: { xs: 'block', md: 'none' },
   margin: '4px 0px 0px -10px',
}

export const logoLayout = {
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer'
}

export const logoText = {
   fontFamily: 'Roboto Serif, serif',
   fontSize: { xs: '20px', sm: '24px' },
   fontWeight: '600',
   marginLeft: '10px'
}

export const searchBar = {
   backgroundColor: 'white',
   borderRadius: '2px',
   width: { xs: '40%', md: '20%' },
   marginLeft: { xs: '30px', md: '0' },
   '& .MuiInputBase-root': { height: '34px' },
   '& .MuiInputBase-input': { padding: '0px 12px' }
}
