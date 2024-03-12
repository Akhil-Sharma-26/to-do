import React from 'react';
import { useState } from "react";
import connection from "../../utils/Backend_connect";
import {useNavigate} from 'react-router-dom'
export default function Todos({ todo }) {
        const navigate = useNavigate();
        const [isTodoEditable, setIsTodoEditable] = useState(false);
        const [content,setcontent] = useState(todo.content)
      async function toggleCompleted() {
        try {
          const res = await connection.get(`/todo/update/${todo._id}`,{ withCredentials: true });
        //   setTodos(res.data.data);
        setTimeout(() => {
            navigate(0) 
        }, 500);
        } catch (error) {
          console.log(error);
        }
      }
      async function editTodo() {
        try {
          const res = await connection.post(`/todo/edit/${todo._id}`, {content:content},{ withCredentials: true });
        //   setTodos(res.data.data);
        setTimeout(() => {
            navigate(0) 
        }, 500);
        } catch (error) {
          console.log(error);
        }
      }
      async function delTodo(){
        try {
            const res = await connection.get(`/todo/del/${todo._id}`,{ withCredentials: true });
          setTimeout(() => {
              navigate(0) 
          }, 500);
          } catch (error) {
            console.log(error);
          }
      }
      return(
    <div key={todo._id}
        className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm  duration-300  text-black ${todo.complete ? "bg-[#c6e9a7]" : "bg-white"
            }`}
    >
        <input
            type="checkbox"
            className="cursor-pointer"
            checked={todo.complete}
            onChange={(e) => {
                e.preventDefault();
                toggleCompleted();
            }}
        />
        <input
            type="text"
            className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.complete ? "line-through" : ""}`}
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            readOnly={!isTodoEditable}
        />
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={() => {
                if (todo.complete) return;

                if (isTodoEditable) {
                    editTodo();
                } else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.complete}
        >
            {isTodoEditable ? "📁" : "✏️"}
        </button>
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => delTodo()}
        >
            ❌
        </button>
    </div>
      )
}