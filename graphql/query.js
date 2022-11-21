const {GraphQLList,GraphQLID} = require('graphql')
const {UserType,PostType,CommentType} = require('./type')
const User = require('../model/user')
const Post = require('../model/post')
const Comment = require('../model/comment')

/* List all users query */
const users = {
    type: new GraphQLList(UserType),
    description: "Retrieves list of users",
    resolve(parent, args) {
        return User.find()
    },
}

/* List single user query */
const user = {
    type: UserType,
    description:"Retrieves single user",
    args:{id:{type:GraphQLID}},
    resolve(parent, args) {
        return User.findById(args.id)
    }
}

/* List all posts query */
const posts = {
    type: new GraphQLList(PostType),
    description: "Retrieves list of posts",
    resolve() {
        return Post.find()
    },
}

/* List single post query */
const post = {
    type:PostType,
    description:"Retrieves single post",
    args: {id:{type:GraphQLID}},
    resolve(_,args){
        return Post.findById(args.id)
    }
}

/* List all comments query */
const comments = {
    type: new GraphQLList(CommentType),
    description: "Retrieves list of comments",
    resolve() {
        return Comment.find()
    },
}

/* List single comment query */
const comment = {
    type:CommentType,
    description:"Retrieves single comment",
    args: {id:{type:GraphQLID}},
    resolve(_,args){
        return Comment.findById(args.id)
    }
}

module.exports = {users,user,posts,post,comments,comment}
