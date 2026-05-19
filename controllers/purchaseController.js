const Purchase = require("../models/Purchase")
const Product = require("../models/Product")

const createPurchase = async (req,res)=> {
    try{
        const {productId,quantity} = req.body;

        const product = await Product.findById(productId)

        if(!productId){
            res.status(404);
    throw new Error("product not found");
        }

        if(product.stock < quantity) {
             res.status(400);
    throw new Error("out of stock");
        }

        const totalPrice = product.price * quantity;

        const purchase = await Purchase.create({
            user:req.user._id,
            product:productId,
            quantity,
            totalPrice
        });

        product.stock -=quantity

        await product.save();

        res.status(201).json(purchase)
    }
    catch(error){
 res.status(500);
    throw new Error(error.message);
    }
}

const getUserPurchase = async(req,res)=>{
    try{

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page-1) * limit;
        const purchase = await Purchase.find({
            user:req.user._id,
        })
        .populate("product")
        .populate("user")
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)

        res.status(201).json({
            currentPage:page,
            totalpages : Math.ceil(purchase.length / limit),
            totalpurchase:purchase.length,
            purchase:purchase
        })
    }catch(error){
 res.status(500);
    throw new Error(error.message);
    }
}

module.exports = {
    getUserPurchase,
    createPurchase
}