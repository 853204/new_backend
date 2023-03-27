let mongoose=require("mongoose")

//user Schema
let userSchema=mongoose.Schema({
    name:String,
    email:String,
    age:Number,
   password:String,
   city:String,
   gender:String,
   is_married:Boolean
   
},{
    versionKey:false
})

//user Model 
let UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}