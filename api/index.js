import express from 'express';
const app = express();
const conn = require('./db');
      conn.connect();

app.get('/login', (req, res) => {
  const sql = 'select * from ERM.user where user_id = ?;'
  conn.query(sql ,req.query.id, function(err, rows, fields){
    try{
      if(!err){
        console.log(JSON.stringify(rows[0]))
        let result=JSON.parse(JSON.stringify(rows))
        let resultCount = Object.keys(result).length

        if(resultCount < 1 || resultCount > 1){
          console.log("로그인 실패")
          res.send(false)
        }

        let user_id = rows[0].user_id
        let user_pw = rows[0].user_pw
        let pwRslt = user_pw.toString()
        let pwdInput = req.query.pw.toString()
          if(pwRslt === pwdInput){
            console.log("로그인 성공")
            res.send(true)
          }else{
            console.log("로그인 실패")
            res.send(false)
          }
      }
      }catch (e) {
        console.log(err);
        this.returnMsg = e.message
      }
  })
})

app.get('/article', (req, res) => {
  console.log("request in")
  const sql = 'select * from ERM.release;'
  conn.query(sql ,req.query.id, function(err, rows, fields){
    try{
      if(!err){
        let result=JSON.parse(JSON.stringify(rows))
        console.log(result)
        let resultCount = Object.keys(result).length
        if(resultCount < 1){
          console.log("조회 실패")
          res.send(false)
        }
        res.send(result)
      }
      }catch (e) {
        console.log(err);
        this.returnMsg = e.message
      }
  })
})

// const user = require('./user')
// app.use('/user', user)

module.exports = {
  path: '/api',
  handler: app
}