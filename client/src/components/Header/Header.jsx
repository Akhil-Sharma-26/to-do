import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import connection from "../../utils/Backend_connect";
// difference between Link and NavLink
// Link is used to navigate to a different page in the application
// NavLink is used to navigate to a different page in the application, but it has the ability to add a class to the link when it is active
// import { useContext } from "react";
// import UserContext from "../../context/userContext";
export default function Header() {
    // const { user } = useContext(UserContext)
    const [error, seterror] = useState(false)
    const [user, setuser] = useState("Hello")
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await connection.get('/user/check', { withCredentials: true });
                // console.log(res);
                if (res.data.data === null) {
                    seterror(true)
                }
                else {
                    // console.log(res);
                    setuser(res.data.data)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])
    return (
        <header className="shadow sticky z-50 top-0 ">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Id4Mq28I0vUWogVP9cFN1U2drmHlxhpzPQ&usqp=CAU"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>

                    <div className={`flex items-center lg:hidden`}>
                        <button onClick={toggleMenu}>
                            <span>&#9776;</span>
                        </button>
                    </div>
                    <div
                        className={`${isOpen ? 'block' : 'hidden'
                            } lg:flex justify-between items-center w-full lg:w-auto lg:order-1`}
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 bold
                                                ${isActive ? "text-blue-500" : "text-gray-800"}
                                                border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0`
                                    }
                                    to="/"
                                >
                                    Todo Baskets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 bold
                                                ${isActive ? "text-blue-500" : "text-gray-800"}
                                                border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0`
                                    }
                                    to="/newbasket"
                                >
                                    New Basket
                                </NavLink>
                            </li>
                            {!error ? (
                                <li className="mt-3 lg:mt-0">
                                    <Link
                                        to="/profile"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 my-4 focus:outline-none"
                                    >
                                        {user?.username}
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li className="mt-3 lg:mt-0">
                                        <Link
                                            to="/login"
                                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 lg:py-2.5 mr-2 focus:outline-none py-4" 
                                        >
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="mt-3 lg:mt-0">
                                        <Link
                                            to="/signup"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5  lg:py-2.5 focus:outline-none mt-4"
                                        >
                                            Sign up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
