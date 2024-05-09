const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = asyncHandler(async(req,res, next)=>{
    if(req.cookies.token){
        //!verify the token
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded?.id).select('-password');
        return next();
    }else{
        return res.status(402).json({message:'Not authorized, no token'})
    }
});

module.exports = isAuthenticated;