const express = require('express')
const db = require('./conn')
const app = express()
const dotenv = require('dotenv')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./graphql/schema')
dotenv.config()
const {createJwtToken} = require('./auth')
const {authenticate}  =require('./middleware/auth')


app.get('/',(req,res)=>{
    console.log(req.verifiedUser)
    res.json({message:"Hello World"})
})

app.use(authenticate)

app.get('/authtest',(req,res)=>{
// res.json(createJwtToken({
//     userName:"kishan",
//     email:"kishan@mailinator.com",
//     displayName:"Kishan Mishra",
//     password:"123456",
//     admin:false
// }))
})

app.use('/graphql',graphqlHTTP({
    schema : schema,
    graphiql : true

}))


app.listen(process.env.PORT,()=>{
    console.log(`Connection is established on port no ${process.env.PORT}`)
})