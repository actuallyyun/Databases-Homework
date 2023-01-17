const express = require("express");
const app = express();

app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});

const { Pool } = require('pg');

const pool = new Pool({
    user: 'Ayun',
    host: 'localhost',
    database: 'cyf_hotels',
    password: '1121',
    port: '',
});


app.get("/hotels", function(req, res) {
    pool.query('SELECT * FROM hotels', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/customers",function(req,res){
    pool.query('SELECT * FROM customers',(err,result)=>{
        res.json(result.rows)
    })
})

app.get("/suppliers",function(req,res){
    pool.query('SELECT * FROM suppliers',(err,result)=>{
        res.json(result.rows)
    })
})