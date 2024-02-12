import { error } from "console";
import TodoBasket from "../models/todoBasket.model.js";

async function CreatingBasket(req,res){
    const {title} = req.body
    try {
        if(!title){
            throw new error(404,'I Need some title here')
        }
        const Basket = TodoBasket.create({
            title: title,
            createdBy: req.user?._id
        })
        if(!Basket){
            throw new error(502,'Basket Creation Failed');
        }
        return res.status(200).json({
            data: 'WoW! You created a todo Basket!!'
        })
    } catch (error) {
        throw new error(500, "Something horrible went wrong while making a basket")
    }
}

export{
    CreatingBasket,
}