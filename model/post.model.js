let mongoose=require("mongoose")

//post Schema
let postSchema=mongoose.Schema({
   title:String,
   body:String,
   body:String,
   no_of_comments:Number,
   userID: String
  
},{
    versionKey:false
})

//post Model 
let PostModel=mongoose.model("post",postSchema)

module.exports={
    PostModel
}