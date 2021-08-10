const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useCreateIndex:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useNewUrlParser:true
        })
        console.log(`mongodb started on port: ${con.connection.host}`);
    }
    catch(err){
        console.log(`something went wrong. ${err}`);
        process.exit(1)
    }
}
module.exports = connectDB