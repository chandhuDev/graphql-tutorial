const { 
    GraphQLObjectType,
    GraphQLList, 
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt} =require("graphql")
const axios=require("axios")
// github commits commits
  
const userType=new GraphQLObjectType({
    name:"User",
    fields:()=>({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        username : { type : GraphQLString },
        email : { type : GraphQLString },
        phone : { type : GraphQLString},
        address : { type : GraphQLString},
        website : { type : GraphQLString},
        company : { type : GraphQLString}



    })
})    
const rootQuery=new GraphQLObjectType({
    name:"query",
    fields:{
        user:{
        type:userType,
        args:{id : { type:GraphQLID } },
        resolve: async(parent,args)=>{
            const userList=await axios.get("https://jsonplaceholder.typicode.com/users")
            console.log(args.id)
            console.log(userList.data)
            console.log(typeof args.id)
            return userList?.data?.find(user=>{
                
                return user.id==args.id
            })
        }},
        users:{
            type:new GraphQLList(userType),
            resolve: async(parent,args)=>{
                const userList=await axios.get("https://jsonplaceholder.typicode.com/users")
                console.log(userList.data)
                return userList.data
            }
        }
 }
})

module.exports=new GraphQLSchema({
    query:rootQuery
})