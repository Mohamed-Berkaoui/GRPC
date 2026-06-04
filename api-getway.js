const express=require('express')
const grpc=require('@grpc/grpc-js')
const protoLoader=require('@grpc/proto-loader')


const app=express()

app.use(express.json())

const packageDefinition = protoLoader.loadSync(__dirname + '/protos/user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user;


const userClient=new userProto.UserService('127.0.0.1:5000',grpc.credentials.createInsecure())

app.post('/register',function(req,res){
    const {email,password}=req.body;
    userClient.Register({email,password},function(err,response){
        if(err){
            return res.status(500).json({error:err})
        }
        if(response.success){
            return res.status(201).json(response)
        }
          return res.status(400).json(response)
    })
})


app.post('/login',function(req,res){
    const {email,password}=req.body;
    userClient.Login({email,password},function(err,response){
        if(err){
            return res.status(500).json({error:err})
        }
        if(response.success){
            return res.status(201).json(response)
        }
          return res.status(400).json(response)
    })
})


app.post('/verifyToken',function(req,res){
    const {email,password}=req.body;
    userClient.Login({token},function(err,response){
        if(err){
            return res.status(500).json({error:err})
        }
        if(response.success){
            return res.status(201).json(response)
        }
          return res.status(400).json(response)
    })
})

app.listen(80,function(){
    console.log("getway is running")
})
