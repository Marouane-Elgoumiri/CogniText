const mongoose = require("mongoose");


const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect('mongodb+srv://marouaneelgoumiri:VOGzbAkiMOejxgu1@mernsaasai.stwwtwc.mongodb.net/mern-saas-ai?retryWrites=true&w=majority&appName=MERNSaasAI');
        console.log(`MongoDB connected successfully ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDB ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;

//VOGzbAkiMOejxgu1
//marouaneelgoumiri

