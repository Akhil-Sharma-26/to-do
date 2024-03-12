import React from "react";
import connection from "../utils/Backend_connect";
import {useNavigate} from "react-router-dom";
export default function Profile_Page() {
    const router = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await connection.post('/user/logout', {} , { withCredentials: true });
            // console.log(res);
            setTimeout(() => {
                router(0)
            }, 1000);
            router('/login')
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <div className="p-8 rounded-lg shadow-lg w-80 bg-white">
                <h1 className="text-2xl font-semibold mb-4 text-center">Profile Page</h1>
                <button
                    onClick={logoutHandler}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-orange-500 font-medium rounded-lg text-sm px-4 py-2 mt-4 focus:outline-none"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}