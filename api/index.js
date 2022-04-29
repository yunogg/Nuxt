import express from 'express';
const app = express();
const conn = require('./db');
      conn.connect();

app.get('/', (req, res) => {
  console.log(req.query)
  const sql = 'select * from user where user_id = ?;'
  conn.query(sql ,req.query.id, function(err, rows, fields){
    if(!err){
        console.log(JSON.stringify(rows[0]))
      let user_id = rows[0].user_id
      let user_pw = rows[0].user_pw
        console.log("query result : id_" + user_id + " pwd_" + user_pw)
      let pw = user_pw.toString()
      let pwd = req.query.pw.toString()
        if(pw === pwd){
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