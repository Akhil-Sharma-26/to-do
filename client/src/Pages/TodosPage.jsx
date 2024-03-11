import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import connection from '../utils/Backend_connect.ts';

function TodoList() {
  const { bid } = useParams();
  console.log(bid);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await connection.get(`/todo/get/${bid}`, { withCredentials: true });
        setTodos(res.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [bid]);

  return (
    <div>
      {todos.map(todo => (
        <div key={todo._id}>
          <p>{todo.content}</p>
          <p>{todo.complete ? 'Complete' : 'Incomplete'}</p>
        </div>
      ))}
    </div>
  );
}

export default TodoList;