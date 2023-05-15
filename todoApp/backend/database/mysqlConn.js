const mysql=require('mysql2')
const dotenv=require('dotenv')
dotenv.config();

const con=mysql.createConnection({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA

})

if(con){
    console.log("db is connected!")
}else{
    console.log("some error while connecting Db!")
}
module.exports=con;