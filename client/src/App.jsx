import { Header, TodoForm, TodoItem} from './components/index.js'
import React,{useEffect} from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
function App() {
  
  return (
    <>
      <Header />
        <Outlet />
    </>
  );
}

export default App