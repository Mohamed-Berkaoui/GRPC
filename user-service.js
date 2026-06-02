const grpc = require('@grpc/grpc-js')
const { registerUser } = require('./user.rpc')
const protoLoader = require('@grpc/proto-loader')

const jwt = require('jsonwebtoken');
const userModel = require('./models/user.model');
const connectToDb = require('./config/connectToDb');
const packageDefinition = protoLoader.loadSync(__dirname + '/protos/user.proto', {

});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const server = new grpc.Server()

server.addService(userProto.UserService.service, { Register: registerUser });

server.bindAsync("127.0.0.1:5000", grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.log("failed tp start user server", error.message)
    } else {
        connectToDb('user_service')
        server.start()
        console.log("server is running on port", port)
    }
})