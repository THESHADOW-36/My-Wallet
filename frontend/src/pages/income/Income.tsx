import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { addExpDiaTextField, addExpDiaTextFieldLay, addExpDialog, addExpDialogAction, addExpDialogTitle, expAddButton, expRecTableTitle, expRecentTable, expRecentTableContainer, expRtTableBodyCell, expRtTableBodyRow, expRtTableHeadCell, expRtTableHeadRow, expTableContent, expTextField, expTopHeader, expenses, tablePagination, tablePaginationText } from '../expenses/ExpensesStyle'
import { mwIncomeData } from '../data/MyWalletData'
import { AddCircleTwoTone, DeleteForeverTwoTone, EditTwoTone, Search, SettingsInputCompositeSharp } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../constant/Network'
import { Url } from '../../constant/Url'
import toast from 'react-hot-toast'


interface IncomeData {
   date: string;
   name: string;
   bank: string;
   amount: number;
   payMethod: string;
}
interface IncomeDataDB {
   _id: string;
   date: string;
   name: string;
   bank: string;
   amount: number | null | undefined;
   payMethod: string;
}
interface ErrIncome {
   date: boolean;
   name: boolean;
   bank: boolean;
   amount: boolean;
   payMethod: boolean;
}

const Incomes: React.FC = () => {
   const { id } = useParams();
   const router = useNavigate();
   const [incomeData, setIncomeData] = useState<IncomeData>({ date: '', name: '', bank: '', amount: 0, payMethod: '' })
   const [errorIncome, setErrorIncome] = useState<ErrIncome>({ date: false, name: false, bank: false, amount: false, payMethod: false });
   const [addIncome, setAddIncome] = useState(false);
   const [editIncome, setEditIncome] = useState(false);
   const [incomeDataDB, setIncomeDataDB] = useState<IncomeDataDB[]>([])

   const paramsObj = { skip: 0, limit: 0 };
   const myToken = localStorage.getItem('MyToken');
   const headers = { Authorization: 'Bearer ' + myToken };

   const closeDialog = () => {
      router('/income');
      setEditIncome(false);
   }

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIncomeData({ ...incomeData, [event.target.name]: event.target.value })
      setErrorIncome({ ...errorIncome, [event.target.name]: false })
   }

   const handleBlur = (title: keyof IncomeData) => {
      if (!incomeData[title]) {
         setErrorIncome({ ...errorIncome, [title]: true })
      }
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         if (incomeData.date && incomeData.name && incomeData.bank && incomeData.amount && incomeData.payMethod) {

            API.post(Url.addIncome, incomeData, headers)?.subscribe({
               next(res: any) {
                  toast.success('Income added successfully')
                  setIncomeData({ date: '', name: '', bank: '', amount: 0, payMethod: '' })
                  setAddIncome(false)
                  getIncomeData();
               },
               error(error: any) {
                  toast.error(error.response.data.error)
                  console.log('Error:', error.response.data.error);
               },
               complete() {
                  console.log('Completed');
               }
            })
         } else {
            if (!incomeData.date) {
               errorIncome.date = true;
            } else {
               errorIncome.date = false;
            }
            if (!incomeData.name) {
               errorIncome.name = true;
            } else {
               errorIncome.name = false;
            }
            if (!incomeData.bank) {
               errorIncome.bank = true;
            } else {
               errorIncome.bank = false;
            }
            if (!incomeData.amount) {
               errorIncome.amount = true;
            } else {
               errorIncome.amount = false;
            }
            if (!incomeData.payMethod) {
               errorIncome.payMethod = true;
            } else {
               errorIncome.payMethod = false;
            }
            setErrorIncome({ ...errorIncome });
         }
      } catch (error) {
         console.log(error)
      }
   }

   const editSingleIncome = (id: string) => {
      const singleIncomeUrl = Url.getSingleIncome + id;
      API.get(singleIncomeUrl, {}, headers)?.subscribe({
         next(res: any) {
            setIncomeData(res.data);
         },
         error: (error: any) => {
            console.log('Error:', error);
         },
         complete: () => {
            console.log('Completed');
         }
      })
      setEditIncome(true);
      router(`/income/${id}`);
   }

   const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const editIncomeUrl = Url.editIncome + id
      if (incomeData.date && incomeData.name && incomeData.bank && incomeData.amount && incomeData.payMethod) {
         API.put(editIncomeUrl, incomeData, {headers})?.subscribe({
            next(res: any) {
               toast.success('Income Edited successfully')
               setIncomeData({ date: '', name: '', bank: '', amount: 0, payMethod: '' })
               getIncomeData();
               closeDialog();
            },
            error: (error: any) => {
               toast.error(error.response.data)
               console.log('Error:', error.response.data);
            },
            complete: () => {
               console.log('Completed');
            }
         })
      } else {
         if (!incomeData.date) {
            errorIncome.date = true;
         } else {
            errorIncome.date = false;
         }
         if (!incomeData.name) {
            errorIncome.name = true;
         } else {
            errorIncome.name = false;
         }
         if (!incomeData.bank) {
            errorIncome.bank = true;
         } else {
            errorIncome.bank = false;
         }
         if (!incomeData.amount) {
            errorIncome.amount = true;
         } else {
            errorIncome.amount = false;
         }
         if (!incomeData.payMethod) {
            errorIncome.payMethod = true;
         } else {
            errorIncome.payMethod = false;
         }
         setErrorIncome({ ...errorIncome });
      }
   }

   const deleteIncome = (id: string) => {
      const delIncomeUrl = Url.delIncome + id
      API.deleteApi(delIncomeUrl, {}, headers)?.subscribe({
         next(res: any) {
            getIncomeData();
            toast.success('Income Deleted successfully');
         },
         error: (error: any) => {
            console.log('Error:', error);
         },
         complete: () => {
            console.log('Completed');
         }
      })
   }

   const getIncomeData = () => {
      API.get(Url.getIncome, paramsObj, headers)?.subscribe({
         next(res: any) {
            setIncomeDataDB(res.data);
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
      getIncomeData();
   }, [])
   return (
      <Box sx={expenses}>
         <Paper sx={expRecentTable}>
            <Typography sx={expRecTableTitle}>Income Details</Typography>
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

                  <Button variant='contained' sx={expAddButton} onClick={() => setAddIncome(true)} startIcon={<AddCircleTwoTone sx={{ width: '24px', height: '24px' }} />}>Add</Button>

                  <Dialog sx={addExpDialog} open={addIncome} onClose={() => setAddIncome(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                     <form onSubmit={handleSubmit}>
                        <DialogTitle sx={addExpDialogTitle} id='dialog-title'>Add Income</DialogTitle>
                        <DialogContent>
                           <Box sx={addExpDiaTextFieldLay}>
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 label="Date"
                                 name='date'
                                 type='date'
                                 variant="outlined"
                                 onChange={handleChange}
                                 value={incomeData.date}
                                 error={errorIncome.date}
                                 onBlur={() => handleBlur('date')}
                                 onInput={() => handleBlur('date')}
                                 InputLabelProps={{
                                    shrink: true,
                                 }}
                                 // placeholder='DD-MM-YYYY'
                                 helperText={errorIncome.date && 'Enter the date'} />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Name"
                                 name='name'
                                 type='text'
                                 onChange={handleChange}
                                 value={incomeData.name}
                                 error={errorIncome.name}
                                 onBlur={() => handleBlur('name')}
                                 onInput={() => handleBlur('name')}
                                 placeholder='Eg. Television, Pen Box, Paracetamol...'
                                 helperText={errorIncome.name && 'Enter your full name'}
                              />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Bank"
                                 name='bank'
                                 type='text'
                                 onChange={handleChange}
                                 value={incomeData.bank}
                                 error={errorIncome.bank}
                                 onBlur={() => handleBlur('bank')}
                                 onInput={() => handleBlur('bank')}
                                 placeholder='Eg. Electronics, Stationary, Medicine...'
                                 helperText={errorIncome.bank && 'Enter your bank name'}
                              />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Amount"
                                 name='amount'
                                 type='number'
                                 onChange={handleChange}
                                 value={incomeData.amount}
                                 error={errorIncome.amount}
                                 onBlur={() => handleBlur('amount')}
                                 onInput={() => handleBlur('amount')}
                                 placeholder='Eg. 35,999'
                                 helperText={errorIncome.amount && 'Enter your amount'}
                              />
                              <TextField
                                 sx={addExpDiaTextField}
                                 id="outlined-basic"
                                 variant="outlined"
                                 label="Payment Method"
                                 name='payMethod'
                                 type='text'
                                 onChange={handleChange}
                                 value={incomeData.payMethod}
                                 error={errorIncome.payMethod}
                                 onBlur={() => handleBlur('payMethod')}
                                 onInput={() => handleBlur('payMethod')}
                                 placeholder='Eg. Credit, Debit, Cash, UPI'
                                 helperText={errorIncome.payMethod && 'Enter your payMethod'}
                              />
                           </Box>
                        </DialogContent>
                        <DialogActions sx={addExpDialogAction}>
                           <Button onClick={() => setAddIncome(false)}>Close</Button>
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
                              <TableCell sx={expRtTableHeadCell}>Bank</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Credited (₹)</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Payment Method</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Edit</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Delete</TableCell>
                           </TableRow>
                        </TableHead>

                        <TableBody>
                           {incomeDataDB.map((rtc, index) => (
                              <TableRow sx={expRtTableBodyRow} key={index}>
                                 <TableCell sx={expRtTableBodyCell}>{index + 1}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.date}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.name}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.bank}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.amount}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.payMethod}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton onClick={() => editSingleIncome(rtc._id)}><EditTwoTone /></IconButton></TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton onClick={() => deleteIncome(rtc._id)} ><DeleteForeverTwoTone /></IconButton></TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                        <Dialog sx={addExpDialog} open={editIncome} onClose={closeDialog} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                           <DialogTitle sx={addExpDialogTitle} id='dialog-title'>Edit Income</DialogTitle>
                           <form onSubmit={handleEditSubmit}>
                              <DialogContent>
                                 <Box sx={addExpDiaTextFieldLay}>
                                    <TextField
                                       sx={addExpDiaTextField}
                                       id="outlined-basic"
                                       label="Date"
                                       name='date'
                                       type='date'
                                       variant="outlined"
                                       onChange={handleChange}
                                       value={incomeData.date}
                                       error={errorIncome.date}
                                       onBlur={() => handleBlur('date')}
                                       onInput={() => handleBlur('date')}
                                       InputLabelProps={{
                                          shrink: true,
                                       }}
                                       // placeholder='DD-MM-YYYY'
                                       helperText={errorIncome.date && 'Enter the date'} />
                                    <TextField
                                       sx={addExpDiaTextField}
                                       id="outlined-basic"
                                       variant="outlined"
                                       label="Name"
                                       name='name'
                                       type='text'
                                       onChange={handleChange}
                                       value={incomeData.name}
                                       error={errorIncome.name}
                                       onBlur={() => handleBlur('name')}
                                       onInput={() => handleBlur('name')}
                                       placeholder='Eg. Television, Pen Box, Paracetamol...'
                                       helperText={errorIncome.name && 'Enter your full name'} />
                                    <TextField
                                       sx={addExpDiaTextField}
                                       id="outlined-basic"
                                       variant="outlined"
                                       label="Bank"
                                       name='bank'
                                       type='text'
                                       onChange={handleChange}
                                       value={incomeData.bank}
                                       error={errorIncome.bank}
                                       onBlur={() => handleBlur('bank')}
                                       onInput={() => handleBlur('bank')}
                                       placeholder='Eg. Electronics, Stationary, Medicine...'
                                       helperText={errorIncome.bank && 'Enter your bank name'} />
                                    <TextField
                                       sx={addExpDiaTextField}
                                       id="outlined-basic"
                                       variant="outlined"
                                       label="Amount"
                                       name='amount'
                                       type='number'
                                       onChange={handleChange}
                                       value={incomeData.amount}
                                       error={errorIncome.amount}
                                       onBlur={() => handleBlur('amount')}
                                       onInput={() => handleBlur('amount')}
                                       placeholder='Eg. 35,999'
                                       helperText={errorIncome.amount && 'Enter your amount'} />
                                    <TextField
                                       sx={addExpDiaTextField}
                                       id="outlined-basic"
                                       variant="outlined"
                                       label="Payment Method"
                                       name='payMethod'
                                       type='text'
                                       onChange={handleChange}
                                       value={incomeData.payMethod}
                                       error={errorIncome.payMethod}
                                       onBlur={() => handleBlur('payMethod')}
                                       onInput={() => handleBlur('payMethod')}
                                       placeholder='Eg. Credit, Debit, Cash, UPI'
                                       helperText={errorIncome.payMethod && 'Enter your payMethod'} />
                                 </Box>
                              </DialogContent>
                              <DialogActions sx={addExpDialogAction}>
                                 <Button onClick={closeDialog}>Close</Button>
                                 <Button type='submit'>Submit</Button>
                              </DialogActions>
                           </form>
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

export default Incomes
