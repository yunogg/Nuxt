import express from 'express';
const app = express();
const conn = require('./db');
      conn.connect();

app.get('/', (req, res) => {
  console.log(req.query)
  conn.query('select * from user where user_id = ?;',req.query.id, function(err, rows, fields){
    if(!err){
      console.log(Object.toString(rows))
      let id = JSON.stringify(rows[0].user_id)
      let pwd = JSON.stringify(rows[0].user_pw)
      console.log("id : " + id + "pwd : " + pwd)
        if(req.query.pwd == pwd){
          console.log("true")
          res.send(true)
        }
      }
  })
//res.send('API test');
})

// const user = require('./user')
// app.use('/user', user)

module.exports = {
  path: '/api',
  handler: app
}