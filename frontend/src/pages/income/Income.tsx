import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { addExpDiaTextField, addExpDiaTextFieldLay, addExpDialog, addExpDialogAction, addExpDialogTitle, expAddButton, expRecTableTitle, expRecentTable, expRecentTableContainer, expRtTableBodyCell, expRtTableBodyRow, expRtTableHeadCell, expRtTableHeadRow, expTableContent, expTextField, expTopHeader, expenses, tablePagination, tablePaginationText } from '../expenses/ExpensesStyle'
import { mwIncomeData } from '../data/MyWalletData'
import { AddCircleTwoTone, DeleteForeverTwoTone, EditTwoTone, Search } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


interface IncomeData {
   date: string;
   name: string;
   category: string;
   amount: number;
   payMethod: string;
}
interface IncomeDataDB {
   _id: string;
   date: number;
   name: string;
   category: string;
   amount: number | null | undefined;
   payMethod: string;
}
interface ErrIncome {
   date: boolean;
   name: boolean;
   category: boolean;
   amount: boolean;
   payMethod: boolean;
}

const Incomes: React.FC = () => {
   const { id } = useParams();
   const router = useNavigate();
   const [incomeData, setIncomeData] = useState<IncomeData>({ date: '', name: '', category: '', amount: 0, payMethod: '' })
   const [errorIncome, setErrorIncome] = useState<ErrIncome>({ date: false, name: false, category: false, amount: false, payMethod: false });
   const [addIncome, setAddIncome] = useState(false);
   const [editIncome, setEditIncome] = useState(false);
   const [incomeDataDB, setIncomeDataDB] = useState<IncomeDataDB[]>([])
   
   const paramsObj = { skip: 0, limit: 0 };
   const myToken = localStorage.getItem('MyToken');
   const headers = { Authorization: 'Bearer ' + myToken };

   const closeDialog = () => {
      router('/incomes');
      setEditIncome(false);
   }


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
                     <DialogTitle sx={addExpDialogTitle} id='dialog-title'>Add Income</DialogTitle>
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
                        <Button onClick={() => setAddIncome(false)}>Close</Button>
                        <Button onClick={() => setAddIncome(false)}>Submit</Button>
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
                              <TableCell sx={expRtTableHeadCell}>Bank</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Credited (₹)</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Payment Method</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Edit</TableCell>
                              <TableCell sx={expRtTableHeadCell}>Delete</TableCell>
                           </TableRow>
                        </TableHead>

                        <TableBody>
                           {mwIncomeData.map((rtc, index) => (
                              <TableRow sx={expRtTableBodyRow} key={index}>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.num}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.date}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.name}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.bank}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.credited}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}>{rtc.method}</TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton onClick={() => setEditIncome(true)}><EditTwoTone /></IconButton></TableCell>
                                 <TableCell sx={expRtTableBodyCell}><IconButton sx={{}}><DeleteForeverTwoTone /></IconButton></TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                        <Dialog sx={addExpDialog} open={editIncome} onClose={() => setEditIncome(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                           <DialogTitle sx={addExpDialogTitle} id='dialog-title'>Edit Income</DialogTitle>
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
                              <Button onClick={() => setEditIncome(false)}>Close</Button>
                              <Button onClick={() => setEditIncome(false)}>Submit</Button>
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

export default Incomes
