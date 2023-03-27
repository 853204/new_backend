let express=require("express")
let postRouter=express.Router()
let {PostModel}=require("../model/post.model")
let jwt=require("jsonwebtoken")

postRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    let {q,sort}=req.query
    let val=sort=="asc"?1:-1
    
    //pagination
    let limit=3
    let skip=(+page-1)*limit;
    try{
        if(decoded){
            let post=await PostModel.find({"userID":decoded.userID},{no_of_comments:{ $regex: q,$options: "i"}}).sort({no_of_comments:val}).skip(skip).limit(limit)
            res.status(200).send(post)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

postRouter.post("/add",async(req,res)=>{
    try{
        const note=new PostModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new post has been added"}) 
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
     
    let palyload=req.body
    let postID=req.params.postID
    try{
        await PostModel.findByIdAndUpdate({_id:postID},palyload)
        res.status(200).send({"msg":"post has been updated"})
    }catch(err){
            res.status(400).send({"msg":err.message})

        }
    
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    let postID=req.params.postID
    try{
        await PostModel.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":"post has been deleted"})
    }catch(err){
            res.status(400).send({"msg":err.message})

        }
})

module.exports={
    postRouter
}
