import React,{useEffect} from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header';
function App() {
  
  return (
    <>
      <Header />
        <Outlet />
    </>
  );
}

export default App