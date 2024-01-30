import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { addExpDiaTextField, addExpDiaTextFieldLay, addExpDialog, addExpDialogAction, addExpDialogTitle, expAddButton, expRecTableTitle, expRecentTable, expRecentTableContainer, expRtTableBodyCell, expRtTableBodyRow, expRtTableHeadCell, expRtTableHeadRow, expTableContent, expTextField, expTopHeader, expenses, tablePagination, tablePaginationText } from './ExpensesStyle'
import { mwExpData } from '../data/MyWalletData'
import { AddCircleTwoTone, DeleteForeverTwoTone, EditTwoTone, Search } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { API } from '../../constant/Network'


interface ExpData {
   date: string;
   name: string;
   category: string;
   amount: string;
   payment: string;
}
interface ExpDataDB {
   date: string;
   name: string;
   category: string;
   amount: string;
   payment: string;
}

interface ErrExp {
   date: boolean,
   name: boolean,
   category: boolean,
   amount: boolean,
   payment: boolean
}


const Expenses: React.FC = () => {
   const [expData, setExpData] = useState<ExpData>({ date: '', name: '', category: '', amount: '', payment: '' })
   const [errorExpenses, setErrorExpenses] = useState<ErrExp>({ date: false, name: false, category: false, amount: false, payment: false });
   const [addExpenses, setAddExpenses] = useState(false);
   const [editExpenses, setEditExpenses] = useState(false);
   const [expDataDB, setExpDataDB] = useState<ExpDataDB[]>([])
   // console.log(expData)
   // console.log('errorExpenses', errorExpenses)

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpData({ ...expData, [event.target.name]: event.target.value })
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         if (expData.date && expData.name && expData.category && expData.amount && expData.payment) {
            // new Observable((observer: any) => {
            //    const response = axios.post('http://localhost:8000/api/v1/wallet/expenses')
            //    if (response) {

            //    }
            // })
            alert('Successfull')
            setExpData({ date: '', name: '', category: '', amount: '', payment: '' })
         } else {
            if (!expData.date) {
               errorExpenses.date = true;
            } else {
               errorExpenses.date = false;
            }
            if (!expData.name) {
               errorExpenses.name = true;
            } else {
               errorExpenses.name = false;
            }
            if (!expData.category) {
               errorExpenses.category = true;
            } else {
               errorExpenses.category = false;
            }
            if (!expData.amount) {
               errorExpenses.amount = true;
            } else {
               errorExpenses.amount = false;
            }
            if (!expData.payment) {
               errorExpenses.payment = true;
            } else {
               errorExpenses.payment = false;
            }
            setErrorExpenses({ ...errorExpenses });
         }
      } catch (error) {
         console.log(error)
      }
   }

   const handleBlur = (title: keyof ExpData) => {
      console.log('handleBlurTitle', title)
      if (!expData[title]) {
         setErrorExpenses({ ...errorExpenses, [title]: true })
      } else {
         setErrorExpenses({ ...errorExpenses, [title]: false })
      }
   }
   // HandleBlur Structure...
   // const handleBlurName = () => {
   //    if (!expData.name) {
   //       setErrorExpenses({ ...errorExpenses, name: true })
   //    } else {
   //       setErrorExpenses({ ...errorExpenses, name: false })
   //    }
   // }

   const getExpData = () => {
      const url = 'http://localhost:8000/api/v1/wallet/expenses';
      const paramsObj = { skip: 0, limit: 0 };
      const headers = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTkxMTM0MWNlOGE3MTYwOGQ3ZmFkNyIsImlhdCI6MTcwNjYxNjQyMSwiZXhwIjoxNzA2NjM5ODc3fQ.O1Krub6JxY1dTxcR9-fru8a37ZpoIhdfuR5ynD6iNdY' };
      const config = { paramsObj, headers }
      API.get(url, config)?.subscribe((res: any) => {
         setExpDataDB(res.data)
      })
   }
   console.log(expDataDB)

   useEffect(() => {
      getExpData();
   }, [])
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
                                 onChange={handleChange}
                                 value={expData.date}
                                 error={errorExpenses.date}
                                 onBlur={() => handleBlur('date')}
                                 onInput={() => handleBlur('date')}
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
                                 onChange={handleChange}
                                 value={expData.name}
                                 error={errorExpenses.name}
                                 onBlur={() => handleBlur('name')}
                                 onInput={() => handleBlur('name')}
                                 placeholder='Eg. Television, Pen Box, Paracetamol...'
                                 helperText={errorExpenses.name && 'Enter your full name'} />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Category"
                                 name='category'
                                 type='text'
                                 onChange={handleChange}
                                 value={expData.category}
                                 error={errorExpenses.category}
                                 onBlur={() => handleBlur('category')}
                                 onInput={() => handleBlur('category')}
                                 placeholder='Eg. Electronics, Stationary, Medicine...'
                                 helperText={errorExpenses.category && 'Enter the category type'} />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Amount"
                                 name='amount'
                                 type='number'
                                 onChange={handleChange}
                                 value={expData.amount}
                                 error={errorExpenses.amount}
                                 onBlur={() => handleBlur('amount')}
                                 onInput={() => handleBlur('amount')}
                                 placeholder='Eg. 35,999'
                                 helperText={errorExpenses.amount && 'Enter the price of the item'} />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Payment Method"
                                 name='payment'
                                 type='text'
                                 onChange={handleChange}
                                 value={expData.payment}
                                 error={errorExpenses.payment}
                                 onBlur={() => handleBlur('payment')}
                                 onInput={() => handleBlur('payment')}
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
