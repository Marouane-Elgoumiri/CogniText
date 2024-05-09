const asyncHandler = require("express-async-handler");
const axios = require("axios");


const openAIController = asyncHandler(async(req,res)=>{
    const {prompt} = req.body
    console.log(prompt);
    console.log(process.env.OPENAI_KEY);
    try{
        const response = await axios.post("https://api.openai.com/v1/completions",{
            model:'gpt-3.5-turbo-instruct',
            prompt,
            max_tokens: 10
        },{
            headers:{
                Authorization: `Bearer ${process.env.OPENAI_KEY}`,
                'Content-type':"application/json"
            }
        }) 
        console.log(response.data);
    }catch(error){
        console.error("OpenAI API Error:", error.response.data);
        return res.status(400).send({message:"Error Occured!"})
    }
});


module.exports = {openAIController,};