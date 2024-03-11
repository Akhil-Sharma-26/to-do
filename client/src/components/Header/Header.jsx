import React from "react";
import { Link, NavLink } from "react-router-dom";
// difference between Link and NavLink
// Link is used to navigate to a different page in the application
// NavLink is used to navigate to a different page in the application, but it has the ability to add a class to the link when it is active
// import { useContext } from "react";
// import UserContext from "../../context/userContext";
export default function Header() {
    // const { user } = useContext(UserContext)
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Id4Mq28I0vUWogVP9cFN1U2drmHlxhpzPQ&usqp=CAU"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {/* {user ? (
                        <Link
                            to="/profile"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            {user.username} 
                        </Link>
                        ) : (
                        <Link
                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        )
                        
                        } */}
                        <Link
                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            SignUp
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 
                                        ${isActive ? "text-orange-500" : "text-gray-800"}
                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 
                                        ${isActive ? "text-orange-500" : "text-gray-800"}
                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                    to="/about"
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 
                                        ${isActive ? "text-orange-500" : "text-gray-800"}
                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                    to="/contact-me"
                                >
                                    Contact-me
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 
                                        ${isActive ? "text-orange-500" : "text-gray-800"}
                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                    to="/users/:id"
                                >
                                    User
                                </NavLink>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
