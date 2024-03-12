// import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import 'tailwindcss/tailwind.css';
// import axios from 'axios';
import connection from '../utils/Backend_connect.ts';
import React, {useState, useContext, useEffect} from "react";
import UserContext from "../context/UserContext.js";
import UserContextProvider from "../context/UserContextProvider.jsx";

import {useNavigate} from "react-router-dom";
// useEffect(()=>{
//   console.log('Helo');
// },[localStorage.getItem('username')])
function LoginPage ()  {  
  const [username,setusername] =useState('')
  const [pass,setpass] =useState('')

  const router = useNavigate();
  // // context: Comes from Provider
  // const {setUser} = useContext(UserContext)


  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    try {
        const response = await connection.post('/user/login', data, { withCredentials: true });
        // console.log('helo');
        
        // console.log(response.data.data.username);
        // setusername(response.data.data.username)
        // setpass()
        // setUser({username,pass})
        setTimeout(() => {
          router(0)
        }, 1000);
        localStorage.setItem('username',(response.data.data.username))
        router('/')
    } catch (error) {
        console.log('error');
        console.log(error);
    }
  }

  return (
    // <UserContextProvider>
    <Container maxWidth="xs" className='text-white'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <TextField
            {...register("email")}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm md:text-base border-gray-300 rounded-md "
          />
          <TextField
            {...register("password")}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm md:text-base border-gray-300 rounded-md "
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="mt-3 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 "
          >
            LogIn
          </Button>
        </form>
      </Box>
    </Container>
    // </UserContextProvider>
  );
}

export default LoginPage;