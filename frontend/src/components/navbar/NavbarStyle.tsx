
export const appBar = {
   position: 'sticky',
   backgroundColor: '#191919',
   zIndex: (theme: any) => theme.zIndex.drawer + 1
}

export const toolBar = {
   display: 'flex',
   justifyContent: 'space-between'
}

export const menuLogo = {
   color: 'white'
}

export const logoLayout = {
   display: 'flex',
   alignItems: 'center'
}

export const logoText = {
   fontFamily: 'Roboto Serif, serif',
   fontSize: '24px',
   fontWeight: '600',
   marginLeft: '10px'
}

export const searchBar = {
   backgroundColor: 'white',
   borderRadius: '2px',
   width: '20%',
   '& .MuiInputBase-root': { height: '34px' },
   '& .MuiInputBase-input': { padding: '0px 12px' }
}
