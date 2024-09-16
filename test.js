var nodemailer=require('nodemailer')
const express=require('express')
const app=express()
const twilio = require("twilio");
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
const client = twilio(accountSid, authToken);

app.get('/',(req,res)=>{
    res.sendFile('test.html',{root:__dirname})
})

app.post('/email',(req,res)=>{
    console.log('content',req.body.content)
    console.log('email',req.body.email)
    console.log('file',req.body.file)
   // console.log('number',req.body.number)
    let transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
        user:'abc@gmail.com',
        pass:'xxx xxx xxx'
        }
        });
    
        let mailoptions={
            from:'abc455@gmail.com',
            to: req.body.email,
            attachments: [
                {   // stream as an attachment
                  //  filename: 'text.txt',
                    path:req.body.file
                   // content: fs.createReadStream('text1.txt')
                },
            ],
            subject:'Testmail',
            text:req.body.content,
            
            };
    
            transporter.sendMail(mailoptions,function(error,info){
                if(error){
                return console.log(error);
                }
                console.log('mail sent:'+info.response);
                });
                
    
        
                res.sendFile('teste.html',{root:__dirname})

    
    
})
app.post('/number',(req,res)=>{
  console.log('content',req.body.content)
  console.log('number',req.body.number)
  console.log(typeof(req.body.content))
  async function createMessage() {
    const message = await client.messages.create({
      body: req.body.content,
      from: "14439125261",
      to: req.body.number,
    });
  
    console.log(message.body);
  }
  createMessage();
  res.sendFile('testn.html',{root:__dirname})
})

app.listen(3000)
console.log("Server is listening")
