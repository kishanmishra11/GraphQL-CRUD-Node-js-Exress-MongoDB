const  {GraphQLSchema,GraphQLObjectType} = require ('graphql')

const {users,user,posts,post,comments,comment} = require('./query')

const {register,login,addPost,addComment,updatePost,deletePost,updateComment,deleteComment} = require('./mutation')

/* Query Schema For Queries */
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description:"Queries",
    fields:{users,user,posts,post,comments,comment},
})

/* Mutation Schema For Mutations*/
const MutationType = new GraphQLObjectType({
    name:"MutationType",
    description:"Mutation",
    fields:{register,login,addPost,addComment,updatePost,deletePost,updateComment,deleteComment},
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation:MutationType

})