let express=require("express")
let {connection}=require("./db")
let {userRouter}=require("./routes/user.router")
let {postRouter}=require("./routes/post.router")

let {auth}=require("./middleware/auth.middleware")
let cors=require("cors")
require("dotenv")


let app=express()
app.use(cors())
app.use(express.json())



app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log("Cannot connect to DB")
        console.log(err)
    }
    console.log("Server is running at port 8383")
})