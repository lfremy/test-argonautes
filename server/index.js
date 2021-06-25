const express = require('express');
const app = express()
const mysql = require('mysql2');
const body_parser = require('body-parser')
const cors = require('cors');



const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'CRUDDataBase'
    
});


app.use(cors());
app.use(express.json());
app.use(body_parser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    const sqlInsert = `insert into argos (argo_name, argo_gender) values ('Hera', 'female');`
    db.query(sqlInsert, (error, result) => {
       res.send('Bonjour je suis ton serveur. Mon nom est 8080') 
    })    
})

app.post('/api/insert', (req, res) => {
    const argonauteName = req.body.argonauteName;
    const argonauteGender = req.body.argonauteGender;

    const sqlInsert = `INSERT INTO argonautes (argonauteName, argonauteGender) VALUES (?,?);`
    db.query(sqlInsert, [argonauteName, argonauteGender], (err, result) => {
        console.log(result)
   });
});

app.get('/api/get',(req, res) => {
    const select = `SELECT * FROM argonautes LIMIT 50;`
    db.query(select, (err, result) => {
        res.send(result)
    });
})

app.listen(8080, () => {
    console.log('running on server 8080')
});