import { Box, Button, Checkbox, FormControlLabel, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { inputColon, inputLabel, inputLayout, inputTextField, signUp, signUpLayout, signUpTitle, suNavToSignIn, suSubmitLayout } from './SignUpStyle'
// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';



interface UsData {
   firstName: string;
   lastName: string;
   userName: string;
   dob: string;
   email: string;
   password: string;
   confirmPassword: string;
}

interface ErrData {
   firstName: boolean;
   lastName: boolean;
   userName: boolean;
   dob: boolean;
   email: boolean;
   password: boolean;
   confirmPassword: boolean;
}

const SignUp = () => {

   const [userData, setUserData] = useState<UsData>({ firstName: '', lastName: '', userName: '', dob: '', email: '', password: '', confirmPassword: '' });
   console.log(userData)
   const [errorData, setErrorData] = useState<ErrData>({ firstName: false, lastName: false, userName: false, dob: false, email: false, password: false, confirmPassword: false })

   const router = useNavigate();

   function signInPg() {
      router('/sign-in')
   }

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [event.target.name]: event.target.value })
   }


   // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   //    event.preventDefault();
   //    if (userData.name && userData.email && userData.password && userData.role) {
   //       try {
   //          console.log('Submitted Data :', userData);
   //          const response = await axios.post('http://localhost:5000/api/v1/auth/register', { userData });
   //          console.log('Submitted res :', response);
   //          console.log(response);
   //          if (response) {
   //             alert('Successfull')
   //             setUserData({ name: '', email: '', password: '', role: '' })
   //          }
   //       } catch (error) {
   //          console.log(error)
   //       }
   //    } else {
   //       alert('Error')
   //    }
   // }

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (userData.firstName && userData.lastName && userData.userName && userData.dob && userData.email && userData.password && userData.confirmPassword) {
         try {
            console.log('Submitted Data :', userData);
            const response = await axios.post('http://localhost:8000/api/v1/auth/register', { userData });
            console.log('Submitted res :', response);
            console.log(response);
            if (response) {
               alert('Successfull')
               setUserData({ firstName: '', lastName: '', userName: '', dob: '', email: '', password: '', confirmPassword: '' })
            }
         } catch (error) {
            console.log(error)
         }
      } else {
         alert('Error')
         if (!userData.firstName) {
            errorData.firstName = true;
         } else {
            errorData.firstName = false;
         }
         if (!userData.lastName) {
            errorData.lastName = true;
         } else {
            errorData.lastName = false;
         }
         if (!userData.userName) {
            errorData.userName = true;
         } else {
            errorData.userName = false;
         }
         if (!userData.dob) {
            errorData.dob = true;
         } else {
            errorData.dob = false;
         }
         if (!userData.email) {
            errorData.email = true;
         } else {
            errorData.email = false;
         }
         if (!userData.password) {
            errorData.password = true;
         } else {
            errorData.password = false;
         }
         if (!userData.confirmPassword) {
            errorData.confirmPassword = true;
         } else {
            errorData.confirmPassword = false;
         }
         setErrorData({ ...errorData });
      }
   }

   const handleError = (title: keyof UsData) => {
      if (!userData[title]) {
         setErrorData({ ...errorData, [title]: true })
      } else {
         setErrorData({ ...errorData, [title]: false })
      }
   }

   return (
      <Box sx={signUpLayout}>
         <Paper sx={signUp}>
            <Typography sx={signUpTitle}>Sign Up</Typography>

            <form onSubmit={handleSubmit}>
               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>First Name</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     id="outlined-basic"
                     variant="outlined"
                     name='firstName'
                     type='text'
                     value={userData.firstName}
                     error={errorData.firstName}
                     onBlur={() => handleError('firstName')}
                     onInput={() => handleError('firstName')}
                     onChange={handleChange}
                     placeholder='First Name' 
                     helperText={errorData.firstName && 'Error'}/>
               </Box>

               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>Last Name</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     id="outlined-basic"
                     variant="outlined"
                     name='lastName'
                     type='text'
                     value={userData.lastName}
                     error={errorData.lastName}
                     onBlur={() => handleError('lastName')}
                     onInput={() => handleError('lastName')}
                     onChange={handleChange}
                     placeholder='Last Name' 
                     helperText={errorData.lastName && 'Error'}/>
               </Box>

               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>User Name</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     id="outlined-basic"
                     variant="outlined"
                     name='userName'
                     type='text'
                     value={userData.userName}
                     error={errorData.userName}
                     onBlur={() => handleError('userName')}
                     onInput={() => handleError('userName')}
                     onChange={handleChange}
                     placeholder='User Name' 
                     helperText={errorData.userName && 'Error'}/>
               </Box>

               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>Date Of Birth</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     id="outlined-basic"
                     variant="outlined"
                     name='dob'
                     type='date'
                     value={userData.dob}
                     error={errorData.dob}
                     onBlur={() => handleError('dob')}
                     onInput={() => handleError('dob')}
                     onChange={handleChange}
                     placeholder='DOB' 
                     helperText={errorData.dob && 'Error'}/>
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
                     error={errorData.email}
                     onBlur={() => handleError('email')}
                     onInput={() => handleError('email')}
                     onChange={handleChange}
                     placeholder='Email' 
                     helperText={errorData.email && 'Error'}/>
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
                     error={errorData.password}
                     onBlur={() => handleError('password')}
                     onInput={() => handleError('password')}
                     onChange={handleChange}
                     placeholder='Password' 
                     helperText={errorData.password && 'Error'}/>
               </Box>

               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>Confirm Password</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     id="outlined-basic"
                     variant="outlined"
                     name='confirmPassword'
                     type='text'
                     value={userData.confirmPassword}
                     error={errorData.confirmPassword}
                     onBlur={() => handleError('confirmPassword')}
                     onInput={() => handleError('confirmPassword')}
                     onChange={handleChange}
                     placeholder='Confirm Password' 
                     helperText={errorData.confirmPassword && 'Error'}/>
               </Box>

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
