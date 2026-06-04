const userModel = require("./models/user.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
/**
 *
 * @param {Object} call the grpc request object payload
 * @param {Object} call.request it represents the register request message
 * @param {*} callback a function to trigger network response
 */
async function registerUser(call, callback) {
  try {
    const { email, password } = call.request;
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return callback(null, { success: false, message: "User already exist." });
    }
    const hash = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({
      email: email,
      password: hash,
    });

    return callback(null, { success: true, message: "User created" });
  } catch (error) {
    return callback(error, null);
  }
}

async function loginUser(call, callback) {
  try {
    const { email, password } = call.request;
    const existUser = await userModel.findOne({ email: email });
    if (!existUser) {
      return callback(null, {
        success: false,
        message: "somthing went wrong.",
      });
    }
    const isCorrectPassword = bcrypt.compareSync(password, existUser.password);
    if (!isCorrectPassword) {
      return callback(null, {
        success: false,
        message: "somthing wengt wrong.",
      });
    }
    const token= jwt.sign({userId:existUser._id},"123456",{expiresIn:"1d"})

    return callback(null, { success: true, message: "success",token });
  } catch (error) {
    return callback(error, null);
  }
}

async function verifyUserToken(call, callback) {
  try {
    const { token } = call.request;
    const decode =jwt.verify(token,"123456")
   
    return callback(null, { isValid: true, userId: decode.userId});
  } catch (error) {
    return callback(error, {isValid:false});
  }
}



module.exports = { registerUser,loginUser ,verifyUserToken};
