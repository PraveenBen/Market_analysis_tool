const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express(cors());

app.request;
const db = mysql.createConnection({
    host: "localhost",
    user:'root',
    password: "",
    database: "market_analysis_db"
})

app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM users WHERE user = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err) return res.json("Login failed");
        return res.json(data)
    })
})

app.get('/',(re,res)=>{
    return res.json("Backend- is")
})

app.listen(3001, ()=>{
    console.log('Listening.....')
})