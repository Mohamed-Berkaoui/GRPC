const grpc = require('@grpc/grpc-js')
const { registerUser, loginUser, verifyUserToken } = require('./user.rpc')
const protoLoader = require('@grpc/proto-loader')

const jwt = require('jsonwebtoken');
const userModel = require('./models/user.model');
const connectToDb = require('./config/connectToDb');
const packageDefinition = protoLoader.loadSync(__dirname + '/protos/user.proto', {

});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const server = new grpc.Server()

server.addService(userProto.UserService.service, { Register: registerUser,Login:loginUser,VerifyToken:verifyUserToken });

server.bindAsync("127.0.0.1:5000", grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.log("failed tp start user server", error.message)
    } else {
        connectToDb('Todo_User_Service')
        server.start()
        console.log("server is running on port", port)
    }
})