const express=require('express');
const app=express();
const cors=require('cors');
const {mongoConnection}=require('./database/db');

mongoConnection();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","OPTIONS","PUT"],
    credentials:true
})
);
app.use(require('./routes/auth'));
app.use(require('./routes/createpost'));
app.use(require('./routes/user'));





app.listen(process.env.PORT,()=>{console.log(`Listening on port:${process.env.PORT}`)});