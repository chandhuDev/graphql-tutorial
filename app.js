const express=require("express")
const {graphqlHTTP}=require("express-graphql")
const schema=require("./schema/schema")
const mongoose=require("mongoose")

const password=process.env.PASSWORD
const app=express()

mongoose.connect(`mongodb+srv://chandhuGraphQL:${password}@cluster0.kvd5vh7.mongodb.net/?retryWrites=true&w=majority`)
mongoose.connection.once('open',()=>{
    console.log("mongoose database is connected")
})
app.use("/graph",graphqlHTTP({
    schema,
    graphiql:true
}))


module.exports=app