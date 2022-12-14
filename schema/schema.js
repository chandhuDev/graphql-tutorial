const { 
    GraphQLObjectType,
    GraphQLList, 
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt} =require("graphql")
const axios=require("axios")
const comment=require("../db_schema/commentSchema.js")
const user=require("../db_schema/userSchema.js")
 
const userType=new GraphQLObjectType({
    name:"User",
    fields:()=>({
        name : { type : GraphQLString },
        email : { type : GraphQLString },
        comment:{
            type:commentType,
            resolve(user,args){
                //return the all comments of user
                return comment.findById(user.id)
            }
        }
    })
})   



const commentType=new GraphQLObjectType({
    name:"User",
    fields:()=>({
        userId : { type : GraphQLID },
        message : { type : GraphQLString },
        rating : { type : GraphQLInt },
        user:{
            type:userType,
            resolve(comment,args){
                //return the comments along with the user
                return user.findById({userId:comment.id})
            }
        }
    })
}) 


const rootQuery=new GraphQLObjectType({
    name:"query",
    fields:{
        user:{
        type:userType,
        args:{ id : { type:GraphQLID } },
        resolve: async(parent,args)=>{
            return await user.findById(args.id)
        }},
        users:{
            type:new GraphQLList(userType),
            resolve: async(parent,args)=>{
                 return await user.find({})
            }
        },
        comment:{
            type:commentType,
            args:{id:{type:GraphQLID}},
            resolve:async (comments,args)=>{
              return comment.findById(args.id)
            }
        },
        comments:{
            type:new GraphQLList(commentType),
            resolve:async (comments,args)=>{
                 //return all comments
                 return comment.find({})
            }
        },
 }
})
const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        user:{
            type:userType,
            args:{
                name:GraphQLString,
                email:GraphQLString,
                comment:GraphQLString,
            },
            resolve(parent,args){
                let user= user.create({
                    name:args.name,
                    email:args.email,
                    comment:args.comment,
                 })
                return user.save()
            }
        },
        comment:{
            type:commentType,
            args:{
                userid:GraphQLString,
                message:GraphQLString,
                rating:GraphQLInt,
            },
            resolve(parent,args){
               let comment= comment({
                    userid:args.userid,
                    message:args.message,
                    rating:args.rating,
                })
               return comment.save()
            }
        }
    }
})
module.exports=new GraphQLSchema({
    query:rootQuery,
    mutation:Mutation,
})