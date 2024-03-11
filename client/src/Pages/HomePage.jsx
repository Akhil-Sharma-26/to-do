import React, { useEffect, useState } from 'react';
import connection from '../utils/Backend_connect.ts';
import {useNavigate} from 'react-router-dom';
const HomePage = () => {
    const router = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await connection.get('/basket/get', { withCredentials: true });
                setData(res.data.data);
                console.log(res.data.data);
            } catch (error) {
                setData([]);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-2xl font-bold text-center py-12">Home Page</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.map((item) => (
                    <button onClick={() => router(item._id)}>        
                       <div key={item._id} className=" p-8 rounded-md flex justify-center items-center shadow-2xl bg-blue-100" style={{ width: '400px', height: '400px' }}>
                        <h1 className="text-center">{item.title}</h1>
                    </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
