import React, { ChangeEvent } from 'react'; // ChangeEvent is used for the type of the event in handleAvatarChange
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import 'tailwindcss/tailwind.css';
import connection from '../utils/Backend_connect';

import {Link, useNavigate} from "react-router-dom";
// import { Path } from 'react-router-dom';

function SignupPage() {
    // interface FormInput {
    //     username: string;
    //     email: string;
    //     password: string;
    // }
    const { register, handleSubmit } = useForm();
    const nav = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await connection.post('/user/signup', data);
            // console.log(response);
            // console.log(`${import.meta.env.VITE_APP_BACK}/api/v1`);
            nav('/login');
            alert('Signup Successful. Now Please login to continue');
            // console.log('success: from server')
        } catch (error) {
            console.log('error: from server');
            console.log(error);
        }
    }


    return (
        <>
        <div className='flex items-center justify-center mt-40 font-bold'>
                <h1 className='text-4xl'>
                  Signup
                </h1>
              </div>
        <Container maxWidth="xs" className='text-black'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex flex-col h-full',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            // className=''
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">

                    <TextField
                        {...register("username")}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm md:text-base border-gray-300 rounded-md "
                    />
                    <TextField
                        {...register("email")}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
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
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm md:text-base border-gray-300 rounded-md "
                    />

                    <Button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 "
                    >
                        Sign-Up
                    </Button>
                </form>

            </Box >
        </Container>
        <div className='flex items-center justify-center mt-5'>
            Already have an account?
            &nbsp;
            <Link to='/login' className='underline text-blue-500'>Login here</Link>
        </div>
        </>
    );
}

export default SignupPage;