import express from 'express';
const app = express();
const conn = require('./db');
      conn.connect();

app.get('/', (req, res) => {
  const sql = 'select * from user where user_id = ?;'
  conn.query(sql ,req.query.id, function(err, rows, fields){
    if(!err){
        console.log(JSON.stringify(rows[0]))
      let user_id = rows[0].user_id
      let user_pw = rows[0].user_pw
      let pwRslt = user_pw.toString()
      let pwdInput = req.query.pw.toString()
        if(pwRslt === pwdInput){
          console.log("true")
          res.send(true)
        }else{
          res.send(false)
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