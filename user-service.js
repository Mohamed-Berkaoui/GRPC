const grpc =require('@grpc/grpc-js')

const protoLoader = require('@grpc/proto-loader')

const jwt=require('jsonwebtoken')

const server=new grpc.Server()

server.bindAsync("127.0.0.1:5000", grpc.ServerCredentials.createInsecure(),(error,port)=>{
    if(error){
        console.log("failed tp start user server",error.message)
    }else{
        console.log("server is running on prot" , port)
    }
})