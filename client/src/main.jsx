import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Pages/Login_page.tsx'
import SignUp from './Pages/Signup_Page.tsx'
import { RouterProvider, createBrowserRouter,createRoutesFromElements, Route } from 'react-router-dom'
import TodoForm from './components/TodoForm.jsx'
import TodoItem from './components/TodoItem.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      {/* <Route path='' element={<HomePage/>  }/> */}
      <Route path='/login' element={<Login/>  }/>
      <Route path='/signup' element={<SignUp/>  }/>
      <Route path='/todoform' element={<TodoForm/>  }/>
      <Route path='/todoitem' element={<TodoItem/>  }/>
    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)