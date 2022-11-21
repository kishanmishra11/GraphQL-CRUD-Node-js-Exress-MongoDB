const {modelName} = require('./user')
const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema(
    {
        comment:{
            type: String,
            required :true,
        },

        userId:{
            type: String,
            required: true,
        },

        postId:{
            type: String,
            required: true,
        },
    },{ collection: "comment", timestamps: true}
)

const Comment = new mongoose.model('Comment', commentSchema);

module.exports = Comment;