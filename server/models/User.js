const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    trialperiod:{
       type: Number, 
       default:3, 
    },
    trialActive:{
        type:Boolean,
        default:true,
    },
    trialExpire:{
        type:Date,

    },
    subscription:{
        type:String,
        enum:['Trial','Free','Basic','Premium']
    },
    apiRequestCount:{
        type:Number,
        default: 0
    },
    montlyRequestCount:{
        type: Number,
        default: 0,
    },
    NextBillingDate: Date,
    payments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Payment"
        },
    ],
    history:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"History"
        },
    ],
},  {
        timestamps: true,
    }
);

//! Compile to form the model
const User = mongoose.model('User',userSchema);

module.exports = User;