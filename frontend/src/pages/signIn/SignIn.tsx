import { Box, Button, Checkbox, FormControlLabel, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { forgotPass, inputColon, inputLabel, inputLayout, inputTextField, remMeForPass, rememberMeChkBox, signIn, signInLayout, signInTitle, suNavToSignUp, suSubmitLayout } from './SignInStyle'
import { useNavigate } from 'react-router-dom';


interface mainProps {
   loggedIn: any,
   setLoggedIn: any,
}


const SignIn = (prop: mainProps) => {
   const router = useNavigate();

   function signUpPg() {
      router('/sign-up')
   }

   function homepg() {
      prop.setLoggedIn(true)
      router('/')
   }

   return (
      <Box sx={signInLayout}>
         <Paper sx={signIn}>
            <Typography sx={signInTitle}>Sign In</Typography>

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

            <Box sx={remMeForPass}>
               <FormControlLabel sx={rememberMeChkBox} control={<Checkbox defaultChecked />} label="Remember Me" />
               <Box sx={forgotPass}>Forgot Password</Box>
            </Box>

            <Box sx={suSubmitLayout}>
               <Button variant='contained' onClick={homepg}>Submit</Button>
               <Typography sx={suNavToSignUp} onClick={signUpPg}>Don't have account? Sign Up Here</Typography>
            </Box>
         </Paper>
      </Box>
   )
}

export default SignIn
