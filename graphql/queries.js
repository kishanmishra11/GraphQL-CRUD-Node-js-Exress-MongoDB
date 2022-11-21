//<------------ Register new user mutation query ------------>//

/*
mutation{
    register(userName:"saurabh",email:"saurabh@mailinator.com", password:"123456", displayName:"saurabh mishra")
}
*/

//<------------ Login user mutation query ------------>//

/*
mutation{
    login(email:"saurabh@mailinator.com", password:"123456")
}
*/

//<------------ List all users query ------------>//

/*
query{
    users{
        id
        userName
        email
        displayName
    }
}
*/
//<------------ view single user query ------------>//

/*query{
    user(id:"637b59a91db0a22959428229"){
        id
        userName
        email
        displayName
    }
}
*/

//<------------ Add post mutation query ------------>//

/*
mutation{
    addPost(title:"second post" body:"this is my second post"){
        id
        title
        body
    }
}
*/
//<------------  List all post query ------------>//

/*
query{
    posts{
        id
        title
        body
        author{
            id
            displayName
            email
        }
    }
}
*/
//<------------ view single post query ------------>//

/*
query{
    post(id:"637b60d82e569fa006d9dbe5"){
        id
        title
        body
        author{
            id
            displayName
            email
        }
    }
}
*/
//<------------ Add Comment mutation query ------------>//

/*
mutation{
    addComment(comment:"second cooment",postId:"637b60d82e569fa006d9dbe5"){
        id
        comment
        post{
            id
            title
            body
        }
    }
}
*/
//<------------ List all comment ------------>//
/*
query{
    comments{
        id
        comment
        post{
            id
            title
            body
        }
    }
}
*/
//<------------ Update post mutation query ------------>//
/*
mutation{
    updatePost(id:"637b60d82e569fa006d9dbe5", title:"second post updated", body:"second body content updated"){
        id
        title
        body
    }
}
*/
//<------------ Delete post mutation query ------------>//

/*
mutation{
    deletePost(postId:"637b60d82e569fa006d9dbe5")
}
*/
//<------------ Add comment mutation query ------------>//

/*
mutation{
    addComment(comment:"my third comment", postId:"637b60d82e569fa006d9dbe5"){
        id
        comment
        post{
            id
            title
            author{
                id
                userName
            }
        }
    }
}
*/
//<------------ update comment mutation query ------------>//
/*
mutation{
    updateComment(id:"637b622b69971086f8f40670", comment:"my updated comment"){
        id
        comment
    }
}
*/

//<------------ delete comment mutation query ------------>//

/*
 mutation{
    deleteComment(commentId:"637b622b69971086f8f40670")
}
*/
