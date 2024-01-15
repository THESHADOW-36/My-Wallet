import { Box, Button, Checkbox, FormControlLabel, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { inputColon, inputLabel, inputLayout, inputTextField, signUp, signUpLayout, signUpTitle, suNavToSignIn, suSubmitLayout } from './SignUpStyle'
// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';



interface UsData {
   name: string;
   email: string;
   password: string;
   role: string;
}

const SignUp = () => {

   const [userData, setUserData] = useState<UsData>({ name: '', email: '', password: '', role: '' });
   console.log(userData)

   const router = useNavigate();

   function signInPg() {
      router('/sign-in')
   }

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [event.target.name]: event.target.value })
   }


   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (userData.name && userData.email && userData.password && userData.role) {
         try {
            console.log('Submitted Data :', userData);
            const response = await axios.post('http://localhost:5000/api/v1/auth/register', { userData });
            console.log('Submitted res :', response);
            console.log(response);
            if (response) {
               alert('Successfull')
               setUserData({ name: '', email: '', password: '', role: '' })
            }
         } catch (error) {
            console.log(error)
         }
      } else {
         alert('Error')
      }
   }

   return (
      <Box sx={signUpLayout}>
         <Paper sx={signUp}>
            <Typography sx={signUpTitle}>Sign Up</Typography>

            <form onSubmit={handleSubmit}>
               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>Name</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     id="outlined-basic"
                     variant="outlined"
                     name='name'
                     type='text'
                     value={userData.name}
                     onChange={handleChange}
                  />
               </Box>
               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>Role</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     id="outlined-basic"
                     variant="outlined"
                     name='role'
                     type='text'
                     value={userData.role}
                     onChange={handleChange}
                  />
               </Box>
               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>Email</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     id="outlined-basic"
                     variant="outlined"
                     name='email'
                     type='text'
                     value={userData.email}
                     onChange={handleChange}
                  />
               </Box>
               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>Password</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     id="outlined-basic"
                     variant="outlined"
                     name='password'
                     type='text'
                     value={userData.password}
                     onChange={handleChange}
                  />
               </Box>

               {/* <Box sx={inputLayout}>
               <InputLabel sx={inputLabel} required>First Name</InputLabel>
               <Box sx={inputColon}>:</Box>
               <TextField sx={inputTextField} InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }} placeholder='First Name' />
            </Box>

            <Box sx={inputLayout}>
               <InputLabel sx={inputLabel} required>Last Name</InputLabel>
               <Box sx={inputColon}>:</Box>
               <TextField sx={inputTextField} InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }} placeholder='Last Name' />
            </Box>

            <Box sx={inputLayout}>
               <InputLabel sx={inputLabel} required>User Name</InputLabel>
               <Box sx={inputColon}>:</Box>
               <TextField sx={inputTextField} InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }} placeholder='User Name' />
            </Box>

            <Box sx={inputLayout}>
               <InputLabel sx={inputLabel} required>Date Of Birth</InputLabel>
               <Box sx={inputColon}>:</Box>
               <TextField sx={inputTextField} InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }} placeholder='DOB' />
            </Box>

            <Box sx={inputLayout}>
               <InputLabel sx={inputLabel} required>Email</InputLabel>
               <Box sx={inputColon}>:</Box>
               <TextField sx={inputTextField} InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }} placeholder='Email' />
            </Box>

            <Box sx={inputLayout}>
               <InputLabel sx={inputLabel} required>Password</InputLabel>
               <Box sx={inputColon}>:</Box>
               <TextField sx={inputTextField} InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }} placeholder='Password' />
            </Box>

            <Box sx={inputLayout}>
               <InputLabel sx={inputLabel} required>Confirm Password</InputLabel>
               <Box sx={inputColon}>:</Box>
               <TextField sx={inputTextField} InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }} placeholder='Confirm Password' />
            </Box> */}

               <FormControlLabel control={<Checkbox defaultChecked />} label="I have read and agree to Terms and Conditions" />

               <Box sx={suSubmitLayout}>
                  <Button variant='contained' type='submit'>Submit</Button>
                  <Typography sx={suNavToSignIn} onClick={signInPg}>Already Registered? Sign In Here</Typography>
               </Box>
            </form>

         </Paper>
      </Box>

      // <Box
      //    component="form"
      //    sx={{
      //       '& .MuiTextField-root': { m: 1, width: '40ch' },
      //    }}
      //    noValidate
      //    autoComplete="off"
      // >

      //    <Paper elevation={3} style={{ padding: '30px 0px' }}>

      //       <Typography variant="h4" gutterBottom>
      //          Sign Up
      //       </Typography>

      //       <FormControl>
      //          <TextField id="standard-basic" label="First Name" variant="standard" />
      //          <TextField id="standard-basic" label="Last Name" variant="standard" />
      //          <TextField id="standard-basic" label="Email ID" variant="standard" />
      //       </FormControl>

      //       <Box sx={{ marginLeft: '20px', width: '41.5ch' }} display='flex'>
      //          <TextField label="Select country" select>
      //             <MenuItem value="IN" >INDIA</MenuItem>
      //             <MenuItem value="US">USA</MenuItem>
      //             <MenuItem value="AU">Austraia</MenuItem>
      //          </TextField >
      //          <TextField type='number'>

      //          </TextField>
      //       </Box>

      //       <FormControl sx={{ m: 1, width: '40ch' }} variant="standard" >
      //          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      //          <Input
      //             id="standard-adornment-password"
      //             type={showPassword ? 'text' : 'password'}
      //             startAdornment={
      //                <InputAdornment position="end">
      //                   <IconButton
      //                      aria-label="toggle password visibility"
      //                      onClick={handleClickShowPassword}
      //                   >
      //                      {showPassword ? <VisibilityOff /> : <Visibility />}
      //                   </IconButton>
      //                </InputAdornment>
      //             }
      //          />
      //       </FormControl>

      //       <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
      //          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      //          <Input
      //             id="standard-adornment-password"
      //             type={showPassword ? 'text' : 'password'}
      //             endAdornment={
      //                <InputAdornment position="end">
      //                   <IconButton
      //                      aria-label="toggle password visibility"
      //                      onClick={handleClickShowPassword}
      //                   >
      //                      {showPassword ? <VisibilityOff /> : <Visibility />}
      //                   </IconButton>
      //                </InputAdornment>
      //             }
      //          />
      //       </FormControl>

      //       <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
      //          <Button variant="contained" >
      //             Sign Up
      //          </Button>
      //       </FormControl>

      //       <Button size='small' onClick={() => router("/login")} style={{ cursor: 'pointer' }}>
      //          Already Register? Click here to sign in
      //       </Button>

      //    </Paper>
      // </Box >
   )
}

export default SignUp
