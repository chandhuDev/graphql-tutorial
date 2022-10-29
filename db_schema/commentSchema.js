const mongoose=require("mongoose")
const commentSchema=new mongoose.Schema({
    userId:String,
    message:String,
    rating:Number
})

module.exports=new mongoose.model('Comment',commentSchema)
