const express =require('express')
const app= express();
const dotenv=require('dotenv');
const todoData=require('./data/todoData')
const allRoutes=require('./appRoutes/allRoutes')
dotenv.config();
 const cors=require('cors')
const PORT=process.env.SERVER_PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','DELETE']
}))

app.use('/todos',allRoutes)

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`)
})
