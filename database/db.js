require('dotenv').config();
const mongoose=require('mongoose');

exports.mongoConnection=()=>{
    mongoose.connect(`mongodb+srv://karthik:${process.env.MONGO_DB_PASSWORD}@cluster0.a5ehp.mongodb.net/${process.env.MONGO_DB_COLLECTION}?retryWrites=true&w=majority`,{
          useNewUrlParser:true,
          useUnifiedTopology:true,
         useCreateIndex:true
    })
    mongoose.connection.on('connected',()=>{console.log("Connected...")});
    mongoose.connection.on('error',(err)=>{console.log(`Connection error:${err}`)});
}

