const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    authorId:{
        type: String,
        required: true
    },

    title:{
        type : String,
        required: true,
    },
    body:{
        type:String,
        required : true,
    },
},{ collection: "post", timestamps: true}
)

const Post = new mongoose.model('Post', postSchema);

module.exports = Post;