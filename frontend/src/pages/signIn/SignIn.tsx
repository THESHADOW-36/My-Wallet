import { Box, Button, Checkbox, FormControlLabel, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { forgotPass, inputColon, inputLabel, inputLayout, inputTextField, remMeForPass, rememberMeChkBox, signIn, signInLayout, signInTitle, suNavToSignUp, suSubmitLayout } from './SignInStyle'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../../constant/Network';
import { Url } from '../../constant/Url';


interface mainProps {
   loggedIn: any;
   setLoggedIn: any;
}

interface UserData {
   email: string;
   password: string;
}

interface ErrData {
   email: boolean;
   password: boolean;
}


const SignIn = (prop: mainProps) => {
   const [userData, setUserData] = useState<UserData>({ email: '', password: '' })
   console.log("userData :", userData)
   const [errorData, setErrorData] = useState<ErrData>({ email: false, password: false })

   const router = useNavigate();

   function signUpPg() {
      router('/sign-up')
   }

   function homepg() {
      prop.setLoggedIn(true)
      router('/')
   }

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [event.target.name]: event.target.value })
      setErrorData({ ...errorData, [event.target.name]: false })
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (userData.email && userData.password) {
         API.post(Url.login, userData)?.subscribe({
            next(res: any) {
               console.log(res.token);
               localStorage.setItem('MyToken', res.token);
               toast.success("Logged In Successfull");
               setUserData({ email: '', password: '' });
               homepg();
            },
            error(err: any) {
               console.log(err)
            },
            complete() {
               console.log('Completed');
            },
         })
      } else {
         toast.error('Error')
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
         setErrorData({ ...errorData });
      }
   }

   const handleError = (title: keyof UserData) => {
      if (!userData[title]) {
         setErrorData({ ...errorData, [title]: true })
      }
   }

   return (
      <Box sx={signInLayout}>
         <Paper sx={signIn}>
            <Typography sx={signInTitle}>Sign In</Typography>

            <form onSubmit={handleSubmit}>
               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>Email</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     name='email'
                     type='text'
                     value={userData.email}
                     error={errorData.email}
                     onBlur={() => handleError('email')}
                     onInput={() => handleError('password')}
                     onChange={handleChange}
                     placeholder='Email'
                     helperText={errorData.email && 'Enter the email ID'} />
               </Box>

               <Box sx={inputLayout}>
                  <InputLabel sx={inputLabel} required>Password</InputLabel>
                  <Box sx={inputColon}>:</Box>
                  <TextField sx={inputTextField}
                     InputProps={{ sx: { height: { xs: '34px', sm: '40px', md: '34px' }, fontSize: { xs: '15px', sm: '16px', md: '14px' } } }}
                     name='password'
                     type='text'
                     value={userData.password}
                     error={errorData.password}
                     onBlur={() => handleError('password')}
                     onInput={() => handleError('password')}
                     onChange={handleChange}
                     placeholder='Password'
                     helperText={errorData.password && 'Enter the password'} />
               </Box>

               <Box sx={remMeForPass}>
                  <FormControlLabel sx={rememberMeChkBox} control={<Checkbox defaultChecked />} label="Remember Me" />
                  <Box sx={forgotPass}>Forgot Password</Box>
               </Box>

               <Box sx={suSubmitLayout}>
                  <Button variant='contained' type='submit'>Submit</Button>
                  <Typography sx={suNavToSignUp} onClick={signUpPg}>Don't have account? Sign Up Here</Typography>
               </Box>
            </form>
         </Paper>
      </Box>
   )
}

export default SignIn
