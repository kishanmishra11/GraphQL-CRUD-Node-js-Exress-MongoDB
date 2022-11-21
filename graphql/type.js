const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList} = require('graphql')

const User = require('../model/user')
const Post = require('../model/post')
const Comment = require('../model/comment')

/* User Type */
const UserType = new GraphQLObjectType({
    name:'User',
    description:'User Type',
    fields:()=>({
        id: {type:GraphQLID},
        userName: {type:GraphQLString},
        email: {type:GraphQLString},
        displayName: {type:GraphQLString},
    }),
})

/* Post Type */
const PostType = new GraphQLObjectType({
    name:'Post',
    description:'post types',
    fields:()=>({
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        body:{type:GraphQLString},
        author:{
            type: UserType,
            resolve(parent,args){
                return User.findById(parent.authorId)
            }
        },
        comments:{
            type: GraphQLList(CommentType),
            resolve(parent,args){
                return Comment.find({postId:parent.id})
            }
        }
    })
})

/* Comment Type */
const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description:"Comment Type",
    fields:()=>({
        id:{type:GraphQLID},
        comment:{type:GraphQLString},
        user:{
            type:UserType,
            resolve(parent,args){
            return User.findById(parent.userId)
            },
        },
        post:{
            type:PostType,
            resolve(parent,args){
                return Post.findById(parent.postId)
            }
        }
    })
})

module.exports = {UserType,PostType, CommentType}