const express=require('express')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.sendFile('public/test1.html',{root:__dirname})
})
app.post('/name',(req,res)=>{
console.log("name",req.body.name)
res.sendFile('public/test1.html',{root:__dirname})
})
app.post('/number',(req,res)=>{
    console.log("number",req.body.number)
    res.send("number submitted")

})
app.listen(3000)
console.log("Server is listening ")