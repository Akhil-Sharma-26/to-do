import React, { useState } from 'react';
// import {useRouter} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import connection from '../utils/Backend_connect.ts';
// const router  = useRouter()
const NewBasket = () => {
    const route = useNavigate();
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(title);
        try {
            const res = await connection.post('/basket/create', { title }, { withCredentials: true });
            // console.log(res);
            route('/')
        } catch (error) {
            console.log("Error creating basket", error);
        }
        // router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl mb-8">Create a new basket</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4"
                />
                <Button variant="contained" color="primary" type="submit">
                    OK
                </Button>
            </form>
        </div>
    );
};

export default NewBasket;