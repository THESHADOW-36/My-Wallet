import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { addExpDiaTextField, addExpDiaTextFieldLay, addExpDialog, addExpDialogAction, addExpDialogTitle, expAddButton, expRecTableTitle, expRecentTable, expRecentTableContainer, expRtTableBodyCell, expRtTableBodyRow, expRtTableHeadCell, expRtTableHeadRow, expTableContent, expTextField, expTopHeader, expenses, tablePagination, tablePaginationText } from './ExpensesStyle'
import { AddCircleTwoTone, DeleteForeverTwoTone, EditTwoTone, Search } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { API } from '../../constant/Network'
import toast from 'react-hot-toast'
import { Url } from '../../constant/Url'


interface ExpData {
   date: string;
   name: string;
   category: string;
   amount: number;
   payMethod: string;
}
interface ExpDataDB {
   date: string;
   name: string;
   category: string;
   amount: number | null | undefined;
   payMethod: string;
}

interface ErrExp {
   date: boolean;
   name: boolean;
   category: boolean;
   amount: boolean;
   payMethod: boolean;
}

const Expenses: React.FC = () => {
   const [expData, setExpData] = useState<ExpData>({ date: '', name: '', category: '', amount: 0, payMethod: '' })
   const [errorExpenses, setErrorExpenses] = useState<ErrExp>({ date: false, name: false, category: false, amount: false, payMethod: false });
   const [addExpenses, setAddExpenses] = useState(false);
   const [editExpenses, setEditExpenses] = useState(false);
   const [expDataDB, setExpDataDB] = useState<ExpDataDB[]>([])
   // console.log(expDataDB)
   // console.log('errorExpenses', errorExpenses)
   const paramsObj = { skip: 0, limit: 0 };
   const myToken = localStorage.getItem('MyToken')
   const headers = { Authorization: 'Bearer ' + myToken };
   // console.log("headers :", headers)
   const config = {
      // params: { Url.editExp + "65bb8b1c04bde21d6bf97245" },
      headers: { Authorization: 'Bearer ' + myToken }
   }
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpData({ ...expData, [event.target.name]: event.target.value })
      setErrorExpenses({ ...errorExpenses, [event.target.name]: false })
   }

   const handleBlur = (title: keyof ExpData) => {
      // console.log('handleBlurTitle', title)
      if (!expData[title]) {
         setErrorExpenses({ ...errorExpenses, [title]: true })
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
   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         if (expData.date && expData.name && expData.category && expData.amount && expData.payMethod) {
            API.post(Url.addExp, expData, headers)?.subscribe({
               next(res: any) {
                  console.log("res :", res)
                  toast.success('Product added successfully')
                  setExpData({ date: '', name: '', category: '', amount: 0, payMethod: '' })
               },
               error: (error: any) => {
                  toast.error(error.response.data.error)
                  console.log('Error:', error.response.data.error);
               },
               complete: () => {
                  console.log('Completed');
               }
            })
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
            if (!expData.payMethod) {
               errorExpenses.payMethod = true;
            } else {
               errorExpenses.payMethod = false;
            }
            setErrorExpenses({ ...errorExpenses });
         }
      } catch (error) {
         console.log(error)
      }
   }
   const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         if (expData.date && expData.name && expData.category && expData.amount && expData.payMethod) {
            API.put(Url.editExp, expData, config)?.subscribe({
               next(res: any) {
                  console.log("res :", res)
                  toast.success('Product added successfully')
                  // setExpData({ date: '', name: '', category: '', amount: 0, payMethod: '' })
               },
               error: (error: any) => {
                  toast.error(error.response.data.error)
                  console.log('Error:', error.response.data.error);
               },
               complete: () => {
                  console.log('Completed');
               }
            })
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
            if (!expData.payMethod) {
               errorExpenses.payMethod = true;
            } else {
               errorExpenses.payMethod = false;
            }
            setErrorExpenses({ ...errorExpenses });
         }
      } catch (error) {
         console.log(error)
      }
   }



   const getExpData = () => {
      API.get(Url.getExp, paramsObj, headers)?.subscribe({
         next(res: any) {
            setExpDataDB(res.data);
            // console.log("res :", res)
         },
         error: (error: any) => {
            console.log('Error:', error);
         },
         complete: () => {
            console.log('Completed');
         }
      })
   }

   useEffect(() => {
      getExpData();
   }, [])
   // console.log("expDataDB :", expDataDB)
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
                                 name='payMethod'
                                 type='text'
                                 onChange={handleChange}
                                 value={expData.payMethod}
                                 error={errorExpenses.payMethod}
                                 onBlur={() => handleBlur('payMethod')}
                                 onInput={() => handleBlur('payMethod')}
                                 placeholder='Eg. Credit, Debit, Cash, UPI'
                                 helperText={errorExpenses.payMethod && 'Enter the Method of Payment'} />
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
                           {expDataDB.map((rtc, index) => (
                              <TableRow sx={expRtTableBodyRow} key={index}>
                                 <TableCell sx={expRtTableBodyCell}>{index + 1}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.date}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.name}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.category}</TableCell>
                                 {/* <TableCell sx={expRtTableBodyCell}>{rtc.quantity}</TableCell> */}
                                 <TableCell sx={expRtTableBodyCell}>{rtc.amount}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.payMethod}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton onClick={() => setEditExpenses(true)}><EditTwoTone /></IconButton></TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton sx={{ '&:hover': { color: 'red' } }}><DeleteForeverTwoTone /></IconButton></TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                        <Dialog sx={addExpDialog} open={editExpenses} onClose={() => setEditExpenses(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                           <DialogTitle sx={addExpDialogTitle} id='dialog-title'>Edit Expenses</DialogTitle>
                           {/* <FormControl> */}
                           <form onSubmit={handleEditSubmit}>
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
                                       helperText={errorExpenses.date && 'Enter the date'}
                                       required />
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
                                       helperText={errorExpenses.name && 'Enter your full name'}
                                       required />
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
                                       helperText={errorExpenses.category && 'Enter the category type'}
                                       required />
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
                                       helperText={errorExpenses.amount && 'Enter the price of the item'}
                                       required />
                                    <TextField
                                       sx={addExpDiaTextField}
                                       id="outlined-basic"
                                       variant="outlined"
                                       label="Payment Method"
                                       name='payMethod'
                                       type='text'
                                       onChange={handleChange}
                                       value={expData.payMethod}
                                       error={errorExpenses.payMethod}
                                       onBlur={() => handleBlur('payMethod')}
                                       onInput={() => handleBlur('payMethod')}
                                       placeholder='Eg. Credit, Debit, Cash, UPI'
                                       helperText={errorExpenses.payMethod && 'Enter the Method of Payment'}
                                       required />
                                 </Box>
                              </DialogContent>
                              <DialogActions sx={addExpDialogAction}>
                                 <Button onClick={() => setEditExpenses(false)}>Close</Button>
                                 <Button type='submit'>Submit</Button>
                              </DialogActions>
                           </form>
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
