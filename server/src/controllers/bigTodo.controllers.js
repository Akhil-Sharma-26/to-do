import { error } from "console";
import TodoBasket from "../models/todoBasket.model.js";
import User from "../models/user.model.js";
async function CreatingBasket(req,res){
    const {title} = req.body
    try {
        if(!title){
            throw new error(404,'I Need some title here')
        }
        const Basket = await TodoBasket.create({
            title: title,
            createdBy: req.user?._id
        })
        console.log(Basket);
        if(Basket){
            await User.findByIdAndUpdate(
                req.user?._id,
                {
                    $push: {
                        Createdtodos : Basket?._id
                    }
            })
        }
        
        // await User.save
        if(!Basket){
            throw new Error(502,'Basket Creation Failed');
        }

        return res.status(200).json({
            data: 'WoW! You created a todo Basket!!'
        })
    } catch (error) {
        throw new Error(500, "Something horrible went wrong while making a basket")
    }
}
async function deleteBasket(req,res){
    const {BasketID} = req.params
    
}
export{
    CreatingBasket,
}