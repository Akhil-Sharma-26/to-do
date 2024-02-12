// import { Error } from "console";
import TodoBasket from "../models/todoBasket.model.js";
import User from "../models/user.model.js";
async function CreatingBasket(req,res){
    const {title} = req.body
    // try {
        if(!title){
            throw new Error(404,'I Need some title here')
        }
        const Basket = await new TodoBasket({
            title: title,
            createdBy: req.user?._id
        })
        await Basket.save()
        console.log(Basket);
        if(Basket){
            await User.findByIdAndUpdate(
                req.user?._id,
                {
                    $push: {
                        Createdtodos : Basket
                    },
                    
            },
            {
                new: true
            })
        }
        await req.user.save()
        // await User.save
        if(!Basket){
            throw new Error(502,'Basket Creation Failed');
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
    console.log(req.params);
    if(!BasketID){
        throw new Error(404,'I Need some ID here')
    }
    const basket = await TodoBasket.findById(BasketID)
    if(!basket){
        throw new Error(404,'Basket doent exist')
    }
    console.log(basket);
    if(!(basket?.createdBy.toString() === req.user?._id.toString())){
        throw new Error(501,"Very bad thing. Unauthorized access!!")
    }
    const delBasket = await TodoBasket.findByIdAndDelete(BasketID)
    if(!delBasket){
        throw new Error(500, "Can't delete Basket")
    }
    const userdel = await User.findByIdAndUpdate(req.user?._id,{
        $pull:{
            Createdtodos : BasketID
        }
    },{new:true})
    // console.log(userdel);
    if(!userdel){
        throw new Error('Couldnt update user when deleting')
    }
    res.status(200).json({
        data: "Nicely deleted the Basket"
    })
}
export{
    CreatingBasket,
    deleteBasket
}