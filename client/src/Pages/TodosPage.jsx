import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import connection from '../utils/Backend_connect.ts';
import Todos from '../components/ShowingTodo/Todos.jsx';
import AddTodo from '../components/AddTodo/AddingTodo.jsx';

function TodoList() {
  const { bid } = useParams();
  // console.log(bid);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await connection.get(`/todo/get/${bid}`);
        setTodos(res.data.data);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [bid]);
  // const updateTodo = (id, todo) => {
  //         setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))


  //     }
  return (
    <div>
      <div className="bg-blue-200 min-h-screen py-8">
        <div className="w-full max-w-2xl bg-white mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <div className="mb-4">
            <AddTodo />
          </div>
          <div className="flex flex-col gap-y-3">
            {todos.map(todo => (
              <Todos key={todo._id} todo={todo} />
            ))}
          </div>  
        </div>
      </div>
    </div>
  );
}

export default TodoList;