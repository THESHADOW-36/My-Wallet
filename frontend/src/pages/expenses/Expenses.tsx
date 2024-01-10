import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, IconButton, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { addExpDiaTextField, addExpDiaTextFieldLay, addExpDialog, addExpDialogAction, addExpDialogTitle, expAddButton, expRecTableTitle, expRecentTable, expRecentTableContainer, expRtTableBodyCell, expRtTableBodyRow, expRtTableHeadCell, expRtTableHeadRow, expTableContent, expTextField, expTopHeader, expenses, tablePagination, tablePaginationText } from './ExpensesStyle'
import { mwExpData } from '../data/MyWalletData'
import { AddCircleTwoTone, DeleteForeverTwoTone, EditTwoTone, Search } from '@mui/icons-material'
import { useState } from 'react'

const Expenses = () => {
   const [addExpenses, setAddExpenses] = useState(false);
   const [editExpenses, setEditExpenses] = useState(false);
   const [expData, setExpData] = useState({ date: '', name: '', category: '', amount: '', payment: '' })
   console.log(expData)

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpData({ ...expData, [event.target.name]: event.target.value })
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (expData.date && expData.name && expData.category && expData.amount && expData.payment) {
         alert('Successfull')
         setExpData({ date: '', name: '', category: '', amount: '', payment: '' })
      } else {
         alert('All fields are mandatory')
      }
   }

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
                     <form onSubmit={handleSubmit}>
                        <DialogContent>
                           <Box sx={addExpDiaTextFieldLay}>
                              <TextField sx={addExpDiaTextField} required variant="outlined" id="outlined-basic" onChange={handleChange} type='text' error={!expData.date && !expData.date.length} value={expData.date} name='date' label="Date" placeholder='DD-MM-YYYY' helperText={!expData.date && 'Enter the date'} />
                              <TextField sx={addExpDiaTextField} required variant="outlined" id="outlined-basic" onChange={handleChange} type='text' error={!expData.name} value={expData.name} name='name' label="Name" placeholder='Eg. Television, Pen Box, Paracetamol...' helperText={!expData.name && 'Enter your full name'} />
                              <TextField sx={addExpDiaTextField} required variant="outlined" id="outlined-basic" onChange={handleChange} type='text' error={!expData.category} value={expData.category} name='category' label="Category" placeholder='Eg. Electronics, Stationary, Medicine...' helperText={!expData.category && 'Enter the category type'} />
                              <TextField sx={addExpDiaTextField} required variant="outlined" id="outlined-basic" onChange={handleChange} type='number' error={!expData.amount} value={expData.amount} name='amount' label="Amount" placeholder='Eg. 35,999' helperText={!expData.amount && 'Enter the price of the item'} />
                              <TextField sx={addExpDiaTextField} required variant="outlined" id="outlined-basic" onChange={handleChange} type='text' error={!expData.payment} value={expData.payment} name='payment' label="Payment Method" placeholder='Eg. Credit, Debit, Cash, UPI' helperText={!expData.payment && 'Enter the Method of Payment'} />
                           </Box>
                        </DialogContent>
                        <DialogActions sx={addExpDialogAction}>
                           <Button onClick={() => setAddExpenses(false)}>Close</Button>
                           <Button type='submit'>Submit</Button>
                        </DialogActions>
                     </form>
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
                           {mwExpData.map((rtc, index) => (
                              <TableRow sx={expRtTableBodyRow} key={index}>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.num}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.date}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.name}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.category}</TableCell>
                                 {/* <TableCell sx={expRtTableBodyCell}>{rtc.quantity}</TableCell> */}
                                 <TableCell sx={expRtTableBodyCell}>{rtc.expenses}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.method}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton onClick={() => setEditExpenses(true)}><EditTwoTone /></IconButton></TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton sx={{ '&:hover': { color: 'red' } }}><DeleteForeverTwoTone /></IconButton></TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                        <Dialog sx={addExpDialog} open={editExpenses} onClose={() => setEditExpenses(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                           <DialogTitle sx={addExpDialogTitle} id='dialog-title'>Edit Expenses</DialogTitle>
                           {/* <FormControl> */}
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
                              <Button type='submit'>Submit</Button>
                           </DialogActions>
                           {/* </FormControl> */}
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
         </Paper >
      </Box >
   )
}

export default Expenses
