const userModel = require("./models/user.model");

/**
 * 
 * @param {Object} call the grpc request object payload
 * @param {Object} call.request it represents the register request message
 * @param {*} callback a function to trigger network response
 */
async function registerUser(call, callback) {
    console.log(12345)
    try {
        const { email, password } = call.request;
        const existUser = await userModel.findOne({ email: email });
        if (existUser) {
            return callback(null, { success: false, message: 'User already exist.' })
        }
        const newUser = await userModel.create({
            email: email,
            password: password,
        })

        return callback(null, { success: true, message: 'User created' })
    } catch (error) {
        return callback(error, null);
    }
}

module.exports = { registerUser };