// import { Error } from "console";
import TodoBasket from "../models/todoBasket.model.js";
import User from "../models/user.model.js";
async function CreatingBasket(req,res){
    const {title} = req.body
    // try {
        if(!title){
            return res.status(400).json({
                error: "Title is missing"
            })
        }
        const Basket = await new TodoBasket({
            title: title,
            createdBy: req.user?._id
        })
        await Basket.save()
        // console.log(Basket);
        // await User.save
        if(!Basket){
            return res.status(501).json({
                error: "Failed to make Basket"
            })
        }

        return res.status(200).json({
            data: 'WoW! You created a todo Basket!!'
        })
    // } catch (error) {
    //     throw new Error(500, "Something horrible went wrong while making a basket")
    // }
}
async function deleteBasket(req,res){
    const {BasketID} = req.params
    // console.log(req.params);
    if(!BasketID){
        return res.status(400).json({
            error: "BasketID is missing"
        })
    }
    const basket = await TodoBasket.findById(BasketID)
    if(!basket){
        return res.status(404).json({
            error: "No Basket found"
        })
    }
    // console.log(basket);
    if(!(basket?.createdBy.toString() === req.user?._id.toString())){
        return res.status(401).json({
            error: "You are not authorized to delete this Basket"
        })
    }
    const delBasket = await TodoBasket.findByIdAndDelete(BasketID)
    if(!delBasket){
        return res.status(501).json({
            error: "Failed to delete the Basket"
        })
    }
    const userdel = await User.findByIdAndUpdate(req.user?._id,{
        $pull:{
            Createdtodos : BasketID
        }
    },{new:true})
    // console.log(userdel);
    if(!userdel){
        return res.status(501).json({
            error: "Failed to delete the Basket"
        })
    }
    res.status(200).json({
        data: "Nicely deleted the Basket"
    })
}
async function getBaskets(req,res){
    const user = req.user
    const baskets = await TodoBasket.find({createdBy:user?._id})
    if(!baskets){
        return res.status(404).json({
            error: "No baskets found"
        })
    }
    res.status(200).json({
        data: baskets
    })
}
export{
    getBaskets,
    CreatingBasket,
    deleteBasket
}