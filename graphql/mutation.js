const {GraphQLString} = require('graphql')
const{PostType,CommentType} = require('./type')
const User = require('../model/user')
const Post = require('../model/post')
const Comment = require('../model/comment')
const {createJwtToken} = require('../auth')


/* Register new user mutation */
const register = {
    type:GraphQLString,
    description:"Register new user",
    args:{
        userName: {type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        displayName:{type:GraphQLString},
    },
    async resolve(parent,args){
        const {userName,email,password,displayName} = args
        const user = new User({userName,email,password,displayName})
        await user.save()
        const token = createJwtToken(user)
        return token
    }
}

/* Login user mutation */
const login = {
    type: GraphQLString,
    description: "Login user",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email }).select("+password")
        console.log(user)
        if (!user || args.password !== user.password) {
            throw new Error("Invalid credentials")
        }

        const token = createJwtToken(user)
        return token
    },
}

/* Add new post mutation */
const addPost = {
    type: PostType,
    description:"Create new post",
    args:{
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    resolve(parent,args,{verifiedUser}){
        console.log("Verified User:",verifiedUser)
        if(!verifiedUser){
            throw new Error("Unauthorized")
        }
        const post  = new Post ({
            authorId:verifiedUser._id,
            title:args.title,
            body:args.body,
        })

        return post.save()
    },
}

/* Update post mutation */
const updatePost = {
    type:PostType,
    description:"Update post",
    args:{
        id:{type:GraphQLString},
        title: {type:GraphQLString},
        body:{type:GraphQLString}
    },
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser){
            throw new Error("Unauthenticated")
        }
        const postUpdated = await Post.findOneAndUpdate(
            {
                _id: args.id,
                authorId:verifiedUser._id,
            },
            {
                title:args.title,body:args.body
            },
            {
                new : true,
                runValidators: true,
            }
        )

        if(!updatePost){
            throw new Error("No post with the given Id for the author")
        }
        return postUpdated
    }

}

/* Delete post mutation */
const deletePost = {
    type:GraphQLString,
    description:"Delete post",
    args:{
        postId: {type:GraphQLString},
    },
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser){
            throw new Error("Unauthenticated")
        }
        const postDeleted = await Post.findOneAndDelete({
            _id: args.postId,
            authorId:verifiedUser._id
        })
        if(!postDeleted){
            throw new Error("No post with the given Id for the author")
        }
        return "Post Deleted"
    }
}

/* Add new comment mutation */
const addComment = {
    type:CommentType,
    description:"Create a new comment on the post",
    args:{
        comment:{type:GraphQLString},
        postId:{type:GraphQLString}
    },
    resolve(parent,args,{verifiedUser}){
        const comment = new Comment({
            userId:verifiedUser._id,
            postId:args.postId,
            comment:args.comment
        })
        return comment.save()
    }
}

/* Update comment mutation */
const updateComment = {
    type:CommentType,
    description:"Update comment",
    args:{
        id:{type:GraphQLString},
        comment: {type:GraphQLString},
    },
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser){
            throw new Error("Unauthenticated")
        }
        const commentUpdated = await Comment.findOneAndUpdate(
            {
                _id: args.id,
                userId:verifiedUser._id,
            },
            {
                comment:args.comment
            },
            {
                new : true,
                runValidators: true,
            }
        )

        if(!commentUpdated){
            throw new Error("No comment with the given Id for the author")
        }
        return commentUpdated
    }

}

/* Delete comment mutation */
const deleteComment = {
    type:GraphQLString,
    description:"Delete comment",
    args:{
        commentId: {type:GraphQLString},
    },
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser){
            throw new Error("Unauthenticated")
        }
        const commentDeleted = await Comment.findOneAndDelete({
            _id: args.commentId,
            userId:verifiedUser._id
        })
        if(!commentDeleted){
            throw new Error("No comment with the given Id for the author")
        }
        return "Comment Deleted"
    }
}


module.exports = {register,login,addPost,addComment,updatePost,deletePost,updateComment,deleteComment}
