const express=require("express")
const {graphqlHTTP}=require("express-graphql")
const Schema=require("./schema/schema")


const app=express()

app.use("/graph",graphqlHTTP({
    schema:Schema,
    graphiql:true
}))


module.exports=app