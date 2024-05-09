const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    reference:{
        type: String,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'pending',
        required:'true',
    },
    subscriptionPlan:{
        type:String,
        required: true

    },
    amount:{
        type:String,
        default: 0,
    },
    montlyRequestCount:{
        type: Number,
        required:true,
    },
    
},  {
        timestamps: true,
    }
);

//! Compile to form the model
const Payment = mongoose.model('Payment',paymentSchema);

module.exports = Payment;