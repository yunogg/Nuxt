import express from 'express';

const app = express();
var getConnection = require('./db');

const userRouter = require('./routes/users');

const releaseRouter = require('./routes/release');

app.use('/user', userRouter);

app.use('/release', releaseRouter);

app.get('/login', (req, res) => {
  getConnection((conn) => {
  let sql = 'select * from ERM.user where user_id = ?;'
  conn.query(sql ,req.query.id, function(err, rows){
      if(!err){
        //console.log(JSON.stringify(rows[0]))
        let result=JSON.parse(JSON.stringify(rows))
        console.log(result);
        let resultCount = Object.keys(result).length;

        if(resultCount < 1 || resultCount > 1){
          console.log("로그인 실패");
          res.send(false);
        }

        let user_id = rows[0].user_id;
        let user_pw = rows[0].user_pw;
        let pwRslt = user_pw;
        let pwdInput = req.query.pw;
          if(pwRslt === pwdInput){

            console.log("로그인 성공")
            res.send(true)
          }else{
            console.log("로그인 실패")
            res.send(false)
          }
      }else{
        console.log(err);
        this.returnMsg = e.message
      }  
  })
  conn.release();
})
})

module.exports = {
  path: '/api',
  handler: app
}