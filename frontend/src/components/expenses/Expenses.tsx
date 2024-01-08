import { Box, Button, Divider, IconButton, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { expButton, expRecTableTitle, expRecentTable, expRecentTableContainer, expRtTableBodyCell, expRtTableHeadCell, expTableContent, expTextField, expTitle, expTopHeader, expenses, tablePagination, tablePaginationText } from './ExpensesStyle'
import { mwData } from '../data/MyWalletData'
import { AddCircleTwoTone, DeleteForeverTwoTone, EditTwoTone, Search } from '@mui/icons-material'

const Expenses = () => {
   return (
      <Box sx={expenses}>
         <Paper sx={expRecentTable}>
            <Typography sx={expRecTableTitle}>Expense Details</Typography>
            <Divider />
            <Box sx={expRecentTableContainer}>
               <Box sx={expTopHeader}>
                  <TextField sx={expTextField}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position='end'>
                              <Search sx={{ fontSize: { xs: '20px', sm: '26px', md: '20px' } }} />
                           </InputAdornment>)
                     }}
                     size='small' placeholder='Search...' />
                  <Button variant='contained' sx={expButton} startIcon={<AddCircleTwoTone sx={{ width: '24px', height: '24px' }} />}>Add</Button>
               </Box>
               <Box sx={expTableContent}>
                  <TableContainer>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableCell sx={expRtTableHeadCell}>Sr.No.</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Date</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Name</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Category</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Quantity</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Expenses (₹)</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Payment Method</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Edit</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Delete</TableCell>
                           </TableRow>
                        </TableHead>

                        <TableBody>
                           {mwData.map((rtc, index) => (
                              <TableRow key={index}>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.num}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.date}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.name}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.category}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.quantity}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.expenses}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.method}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton><EditTwoTone /></IconButton>
                                 </TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton><DeleteForeverTwoTone /></IconButton>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  <Box sx={tablePagination}>
                     <Typography sx={tablePaginationText}>Showing 1 to 10 of 100 Entries</Typography>
                     <Pagination count={10} />
                  </Box>
               </Box>
            </Box>
            {/* <TablePagination
                  component="div"
                  count={100}
                  page={ }
                  onPageChange={ }
                  rowsPerPage={ }
                  onRowsPerPageChange={ } /> */}
         </Paper>
      </Box>
   )
}

export default Expenses
