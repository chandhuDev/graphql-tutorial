require("dotenv").config()
const app=require("./server.js")

let PORT=process.env.PORT || 4000
app.use(PORT,()=>{
    console.log(`running successfully at ${PORT}`)
})