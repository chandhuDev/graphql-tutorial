const { 
    GraphQLObjectType,
    GraphQLList, 
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt} =require("graphql")
const {axios}=require("axios")

  
const userType=new GraphQLObjectType({
    name:"User",
    fields:()=>({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        email : { type : GraphQLString },
        phone : { type : GraphQLString},
        address : { type : GraphQLString},
        website : { type : GraphQLString},
        company : { type : GraphQLString}



    })
})    
const rootQuery={
    name:"query",
    fields:{
        user:{
        type:userType,
        args:{id : { type:GraphQLID } },
        resolve: async(parent,args)=>{
            const userList=await axios.get("https://jsonplaceholder.typicode.com/users")
            return userList.find(user=>user.id===args.id)
        }
        
        },
        users:{
            type:userType,
            args:{id : { type:GraphQLID } },
            resolve: async(parent,args)=>{
                const userList=await axios.get("https://jsonplaceholder.typicode.com/users")
                return userList
            }
        }
 }
}

module.exports=new GraphQLSchema(rootQuery)