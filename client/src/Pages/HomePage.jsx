import React, { useEffect, useState } from 'react';
import connection from '../utils/Backend_connect.ts';
import {useNavigate} from 'react-router-dom';
const HomePage = () => {
    const router = useNavigate();
    const [data, setData] = useState([]);
    const [deror, setDeror] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await connection.get('/basket/get', { withCredentials: true });
                setData(res.data.data);
                console.log(res.data.data);
            } catch (error) {
                setDeror(true);
                setData([]);
            }
        };
        fetchData();
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-2xl font-bold text-center py-12">Home Page</h1>
            {deror ? (
                <div className='text-xl font-bold text-center py-16'>
                    Please Login
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {data.map((item) => (
                                    <button key={item._id} onClick={() => router(`baskets/${item._id}`)}>        
                                       <div key={item._id} className=" p-8 rounded-md flex justify-center items-center shadow-2xl bg-blue-100" style={{ width: '400px', height: '400px' }}>
                                        <h1 key={item._id} className="text-center">{item.title}</h1>
                                    </div>
                                    </button>
                                ))}
                </div>
            )}
            
        </div>
    );
};

export default HomePage;
