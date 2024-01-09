import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { addExpDiaTextField, addExpDiaTextFieldLay, addExpDialog, addExpDialogAction, addExpDialogTitle, expAddButton, expRecTableTitle, expRecentTable, expRecentTableContainer, expRtTableBodyCell, expRtTableBodyRow, expRtTableHeadCell, expRtTableHeadRow, expTableContent, expTextField, expTopHeader, expenses, tablePagination, tablePaginationText } from './ExpensesStyle'
import { mwData } from '../data/MyWalletData'
import { AddCircleTwoTone, DeleteForeverTwoTone, EditTwoTone, Search } from '@mui/icons-material'
import { useState } from 'react'

const Expenses = () => {
   const [addExpenses, setAddExpenses] = useState(false);
   const [editExpenses, setEditExpenses] = useState(false);
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

                  <Button variant='contained' sx={expAddButton} onClick={() => setAddExpenses(true)} startIcon={<AddCircleTwoTone sx={{ width: '24px', height: '24px' }} />}>Add</Button>

                  <Dialog sx={addExpDialog} open={addExpenses} onClose={() => setAddExpenses(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                     <DialogTitle sx={addExpDialogTitle} id='dialog-title'>Add Expenses</DialogTitle>
                     <DialogContent>
                        <Box sx={addExpDiaTextFieldLay}>
                           <TextField sx={addExpDiaTextField} placeholder='DD-MM-YYYY' id="outlined-basic" label="Date" variant="outlined" required />
                           <TextField sx={addExpDiaTextField} placeholder='Eg. Television, Pen Box, Paracetamol...' id="outlined-basic" label="Name" variant="outlined" required />
                           <TextField sx={addExpDiaTextField} placeholder='Eg. Electronics, Stationary, Medicine...' id="outlined-basic" label="Category" variant="outlined" required />
                           <TextField sx={addExpDiaTextField} placeholder='Eg. 35,999' id="outlined-basic" label="Amount" variant="outlined" required />
                           <TextField sx={addExpDiaTextField} placeholder='Eg. Credit, Debit, Cash, UPI' id="outlined-basic" label="Payment Method" variant="outlined" required />
                        </Box>
                     </DialogContent>
                     <DialogActions sx={addExpDialogAction}>
                        <Button onClick={() => setAddExpenses(false)}>Close</Button>
                        <Button onClick={() => setAddExpenses(false)}>Submit</Button>
                     </DialogActions>
                  </Dialog>
               </Box>
               <Box sx={expTableContent}>
                  <TableContainer>
                     <Table>
                        <TableHead>
                           <TableRow sx={expRtTableHeadRow}>
                              <TableCell sx={expRtTableHeadCell}>Sr.No.</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Date</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Name</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Category</TableCell>
                              {/* <TableCell sx={expRtTableHeadCell}>Quantity</TableCell> */}
                              <TableCell sx={expRtTableHeadCell}>Expenses (₹)</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Payment Method</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Edit</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Delete</TableCell>
                           </TableRow>
                        </TableHead>

                        <TableBody>
                           {mwData.map((rtc, index) => (
                              <TableRow sx={expRtTableBodyRow} key={index}>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.num}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.date}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.name}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.category}</TableCell>
                                 {/* <TableCell sx={expRtTableBodyCell}>{rtc.quantity}</TableCell> */}
                                 <TableCell sx={expRtTableBodyCell}>{rtc.expenses}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.method}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton onClick={() => setEditExpenses(true)}><EditTwoTone /></IconButton></TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton><DeleteForeverTwoTone /></IconButton></TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                        <Dialog sx={addExpDialog} open={editExpenses} onClose={() => setEditExpenses(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                           <DialogTitle sx={addExpDialogTitle} id='dialog-title'>Edit Expenses</DialogTitle>
                           <DialogContent>
                              <Box sx={addExpDiaTextFieldLay}>
                                 <TextField sx={addExpDiaTextField} id="outlined-basic" label="Date" variant="outlined" required />
                                 <TextField sx={addExpDiaTextField} id="outlined-basic" label="Name" variant="outlined" required />
                                 <TextField sx={addExpDiaTextField} id="outlined-basic" label="Category" variant="outlined" required />
                                 <TextField sx={addExpDiaTextField} id="outlined-basic" label="Amount" variant="outlined" required />
                                 <TextField sx={addExpDiaTextField} id="outlined-basic" label="Payment Method" variant="outlined" required />
                              </Box>
                           </DialogContent>
                           <DialogActions sx={addExpDialogAction}>
                              <Button onClick={() => setEditExpenses(false)}>Close</Button>
                              <Button onClick={() => setEditExpenses(false)}>Submit</Button>
                           </DialogActions>
                        </Dialog>
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
