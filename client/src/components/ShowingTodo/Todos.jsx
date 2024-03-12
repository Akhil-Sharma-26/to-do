import React from 'react';
import { useState } from "react";

export default function Todos({ todo }) {
      async function toggleCompleted() {
        try {
          const res = await connection.put(`/todo/update/${bid}`, { withCredentials: true });
          setTodos(res.data.data);
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
            className={`border outline-none w-full bg-transparent rounded-lg ${todo.isEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.complete ? "line-through" : ""}`}
            value={todo.content}
        // onChange={(e) => todo.content(e.target.value)}
        // readOnly={!isTodoEditable}
        />
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={() => {
                if (todo.complete) return;

                if (todo.isTodoEditable) {
                    // editTodo();
                } else todo.setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.complete}
        >
            {todo.isTodoEditable ? "📁" : "✏️"}
        </button>
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => todo.deleteTodo(todo._id)}
        >
            ❌
        </button>
    </div>
      )
}