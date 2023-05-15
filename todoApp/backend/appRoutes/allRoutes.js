const express = require("express");
const con=require('../database/mysqlConn')
const routes = express.Router();
const todoData = require("../data/todoData");

routes.get("/getTodos", (req, res) => {
//   res.json(todoData);
// console.log(con)
con.connect(function(err){
    if(err){
        res.json({msg:"connection failed!"})
    }else{
        con.query("SELECT * FROM tododb.tododb",(error,result)=>{
            if(error){
                res.json({msg:"couldn't fetch data"})
                console.log(error)
            }else{
                console.log(result)
                res.json(result)
            }
        })

    }
})
});



routes.post("/addTodos", (req, res) => {
    con.connect((err)=>{
        if(err){
            res.json({msg:"connection failed"})
        }else{
            console.log(req.body)
            const insertQuery="INSERT INTO tododb.tododb (id, userId, title, completed) VALUES (?,?,?,?)"
            con.query(insertQuery,[req.body.id,req.body.userId,req.body.title,req.body.completed],(error,result)=>{
                if(error){
                    res.json({msg:"couldn't insert data"})
                  
                }else{
                    console.log(result)
                    res.json({msg:"Added Successfully"})
                }
            })
        }
       
        
    })
//   console.log(req.body);
//   todoData.push(req.body);
//   res.json({ msg: "Added Successfully" });
});



routes.put("/updateTodo/:id", (req, res) => {
    const updateQuery = "UPDATE tododb.tododb SET title = ?, completed = ? WHERE id = ?";
    con.query(updateQuery, [req.body.title, req.body.completed, req.params.id], (error, result) => {
      if (error) {
        res.json({ msg: "Update Failed" });
      } else {
        res.json({ msg: "Updated Successfully" });
      }
    });
  });
  


  routes.delete("/deleteTodo/:id", (req, res) => {
    const deleteQuery = "DELETE FROM tododb.tododb WHERE id = ?";
    con.query(deleteQuery, [req.params.id], (error, result) => {
      if (error || result.affectedRows === 0) {
        res.status(404).json({ error: "Todo not found" });
      } else {
        res.json({ msg: "Deleted Successfully" });
      }
    });
  });
  
module.exports = routes;