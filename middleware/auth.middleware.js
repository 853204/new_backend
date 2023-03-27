let jwt=require("jsonwebtoken")

let auth=(req,res,next)=>{
  let token=req.headers.authorization
  if(token){
    let decoded=jwt.verify(token,"masai")
    if(decoded){
      req.body.userID=decoded.userID
        next()
    }else{
        res.status(400).send({"msg":"login first!"})
    }
  }else{
    res.status(400).send({"msg":"login first!"})
  }
}

module.exports={
    auth
}