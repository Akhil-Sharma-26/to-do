import { useState } from "react";
// import { useTodo } from "../context";
import {useParams} from "react-router-dom";
import connection from "../../utils/Backend_connect";
import {useNavigate} from 'react-router-dom'
function AddTodo() {
    const navigate = useNavigate();
    const { bid } = useParams();
    const [content,setcontent] = useState("")
    async function add(e) {
        if(content===""){
            return
        }
        e.preventDefault()
        // console.log(content)
        try {
            const res = await connection.post(`/todo/createTodo/${bid}`, {content:content});
            navigate(0)
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 text-black"
                value={content}    
                onChange={(e)=>setcontent(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-500 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default AddTodo;