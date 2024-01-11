import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { addExpDiaTextField, addExpDiaTextFieldLay, addExpDialog, addExpDialogAction, addExpDialogTitle, expAddButton, expRecTableTitle, expRecentTable, expRecentTableContainer, expRtTableBodyCell, expRtTableBodyRow, expRtTableHeadCell, expRtTableHeadRow, expTableContent, expTextField, expTopHeader, expenses, tablePagination, tablePaginationText } from './ExpensesStyle'
import { mwExpData } from '../data/MyWalletData'
import { AddCircleTwoTone, DeleteForeverTwoTone, EditTwoTone, Search } from '@mui/icons-material'
import { useEffect, useState } from 'react'

interface errExp {
   date: boolean,
   name: boolean,
   category: boolean,
   amount: boolean,
   payment: boolean
}

const Expenses = () => {
   const [expData, setExpData] = useState({ date: '', name: '', category: '', amount: '', payment: '' })
   const [errorExpenses, setErrorExpenses] = useState<errExp>({ date: false, name: false, category: false, amount: false, payment: false });
   const [addExpenses, setAddExpenses] = useState(false);
   const [editExpenses, setEditExpenses] = useState(false);
   // console.log(expData)
   // console.log(errorExpenses)

   const dateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpData({ ...expData, date: event.target.value })
      handleBlurData()
   }
   
   const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpData({ ...expData, name: event.target.value })
      // handleBlurName()
   }
   console.log(expData.name)
   console.log(errorExpenses.name)

   const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpData({ ...expData, category: event.target.value })
      handleBlurCategory();
   }

   const amountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpData({ ...expData, amount: event.target.value })
      handleBlurAmount();
   }

   const paymentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpData({ ...expData, payment: event.target.value })
      handleBlurPayment();
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (expData.date && expData.name && expData.category && expData.amount && expData.payment) {
         alert('Successfull')
         setExpData({ date: '', name: '', category: '', amount: '', payment: '' })
      }


      if (!expData.date) {
         console.log("date")
      } else {
         console.log("!date")
      }
      if (!expData.name || !expData.name.length) {
         setErrorExpenses({ ...errorExpenses, name: true })
         console.log("name")
      } else {
         console.log("!name")
      }
      if (!expData.category || !expData.category.length) {
         setErrorExpenses({ ...errorExpenses, category: true })
         console.log("cat")
      } else {
         console.log("!cat")
      }
   }

   // console.log(' Object.keys(expData)', Object.keys(expData))

   const handleBlurData = () => {
      if (!expData.date) {
         setErrorExpenses({ ...errorExpenses, date: true })
      } else {
         setErrorExpenses({ ...errorExpenses, date: false })
      }
   }

   const handleBlurName = () => {
      if (!expData.name) {
         setErrorExpenses({ ...errorExpenses, name: true })
      } else {
         setErrorExpenses({ ...errorExpenses, name: false })
      }
   }

   const handleBlurCategory = () => {
      if (!expData.category) {
         setErrorExpenses({ ...errorExpenses, category: true })
      } else {
         setErrorExpenses({ ...errorExpenses, category: false })
      }
   }

   const handleBlurAmount = () => {
      if (!expData.amount) {
         setErrorExpenses({ ...errorExpenses, amount: true })
      } else {
         setErrorExpenses({ ...errorExpenses, amount: false })
      }
   }

   const handleBlurPayment = () => {
      if (!expData.payment) {
         setErrorExpenses({ ...errorExpenses, payment: true })
      } else {
         setErrorExpenses({ ...errorExpenses, payment: false })
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
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Date"
                                 name='date'
                                 type='date'
                                 onChange={dateHandler}
                                 value={expData.date}
                                 error={errorExpenses.date}
                                 onBlur={handleBlurData}
                                 InputLabelProps={{
                                    shrink: true,
                                 }}
                                 // placeholder='DD-MM-YYYY'
                                 helperText={errorExpenses.date && 'Enter the date'} />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Name"
                                 name='name'
                                 type='text'
                                 onChange={nameHandler}
                                 value={expData.name}
                                 error={errorExpenses.name}
                                 onBlur={handleBlurName}
                                 onInput={handleBlurName}
                                 placeholder='Eg. Television, Pen Box, Paracetamol...'
                                 helperText={errorExpenses.name && 'Enter your full name'} />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Category"
                                 name='category'
                                 type='text'
                                 onChange={categoryHandler}
                                 value={expData.category}
                                 error={errorExpenses.category}
                                 onBlur={handleBlurCategory}
                                 placeholder='Eg. Electronics, Stationary, Medicine...'
                                 helperText={errorExpenses.category && 'Enter the category type'} />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Amount"
                                 name='amount'
                                 type='number'
                                 onChange={amountHandler}
                                 value={expData.amount}
                                 error={errorExpenses.amount}
                                 onBlur={handleBlurAmount}
                                 placeholder='Eg. 35,999'
                                 helperText={errorExpenses.amount && 'Enter the price of the item'} />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Payment Method"
                                 name='payment'
                                 type='text'
                                 onChange={paymentHandler}
                                 value={expData.payment}
                                 error={errorExpenses.payment}
                                 onBlur={handleBlurPayment}
                                 placeholder='Eg. Credit, Debit, Cash, UPI'
                                 helperText={errorExpenses.payment && 'Enter the Method of Payment'} />
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
         </Paper >
      </Box >
   )
}

export default Expenses
