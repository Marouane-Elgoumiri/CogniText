const { Error } = require("mongoose");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
//-----Registration-------

const register = asyncHandler(
    async(req,res)=>{
            const {username, email, password} = req.body;
            if(!username || !email || !password){
                res.status(400)
                throw new Error('Please fill all the required fields')
            }
            const userExists = await User.findOne({email})
            if (userExists) {
                res.status(400)
                throw new Error('User already exist');
            }
    
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
    
            const newUser = new User({
                username, password: hashPassword, email
            });
    
            //date the trial will end:
            newUser.trialExpire = new Date(
                new Date().getTime() + newUser.trialperiod * 24 * 60 * 60 * 1000
            );
            await newUser.save()
            res.json({
                status:true,
                message: "Registration was successful",
                user:{
                    username,
                    email,
                },
            });
    }
)
//-----Login---------
const login = asyncHandler( async(req,res)=>{
    const {email, password}= req.body
    const user = await User.findOne({email})
    if (!user) {
        res.status(401)
        throw new Error("Invalid Error or password");
    }
    const validPassword = await bcrypt.compare(password, user?.password);
    if(!validPassword){
        res.status(401)
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET,{
        expiresIn: '3d'

    })
    console.log(token);

    res.cookie('token', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })
    res.json({
        status:'success',
        _id: user?._id,
        message:'Login success',
        username:user?.username,
        email:user?.email
    });
})
//-----Logout--------
const logout = asyncHandler( async(req,res)=>{
    res.cookie('token','',{maxAge:1});
    res.status(200).json({message:"Logout out successfully"})
})
//-----Profile-------
const userProfile = asyncHandler( async(req, res)=>{
    console.log(req.user);
    const id = "663bd003a62d69ce6c145a14";
    const user= await User.findById(id).select('-password');
    if(user){
        res.status(200).json({
            status:"success",
            user,
        });
    }else{
        res.status(404);
        throw new Error("User not found");
    }
})
//-----Check user Auth-------


//Exports
module.exports = {
    register,
    login,
    logout,
    userProfile
};