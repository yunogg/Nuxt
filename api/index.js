import express from 'express';
const app = express();
var getConnection = require('./db');

app.get('/login', (req, res) => {
  getConnection((conn) => {
  let sql = 'select * from ERM.user where user_id = ?;'
  conn.query(sql ,req.query.id, function(err, rows){
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
      }else{
        console.log(err);
        this.returnMsg = e.message
      }  
  })
  conn.release();
})
})

app.get('/article/select', (req, res) => {

  getConnection((conn) => {
  let sql = 'select * from ERM.release;'
  conn.query(sql ,req.query.id, function(err, rows){
      if(!err){
        if(!rows) console.log(rows);
        let result=JSON.parse(JSON.stringify(rows))
        console.log(result)
        let resultCount = Object.keys(result).length
        if(resultCount < 1){
          console.log("데이터가 없습니다.")
          res.send(false);
          return;
        }
        res.send(result)
      }else{
        console.log(err);
        this.returnMsg = e.message
      }
    })
    conn.release();
  })
})

//배포Id 생성

app.get('/article/makeReleaseId', async (req, res) => {
  getConnection((conn) => {
  //console.log(req.query.data)
  //let params=JSON.parse(req.query.data);
  //console.log(params);
  //let sourceItems =JSON.parse(req.query.sourceItems);
  //console.log("sourceItems : " + JSON.stringify(sourceItems));
  let maxId = 0
  let nextId
  let sql = 'select max(release_id) as maxId from ERM.release;'
    conn.query(sql, function(err, result){
      if(err) throw err;
      console.log(("result : " + JSON.stringify(result)));
      if (!result[0].maxId) {
        console.log("maxId is none.");
        nextId = "000001"
        res.send(nextId);
        return;
      }else{
        console.log("query select maxId")
        maxId = result[0].maxId;
        var regex = /[^0-9]/g;
        nextId = maxId.replace(regex, "");
        nextId = parseInt(nextId) + 1;
        nextId = "000000" + nextId
        nextId = nextId.slice(-6)
        console.log("nextId : " + nextId);
        res.send(nextId)
      }
    })
    conn.release();
  })
})

app.get('/article/save', async (req, res) => {
  getConnection((conn) => {
    let params=JSON.parse(req.query.data);
    console.log("params : " + JSON.stringify(params));
    let release_id = req.query.release_id;
    let sql = 'insert into ERM.release (release_id, release_dt, sys_code, work_code, content) values(?)';
    var values = [
      [params.release_id, params.register_dt, params.sys_code, params.work_code, params.content]
      ];
       conn.query(sql, values, function(err, result){
         if(err) throw err;
         console.log("Number of records inserted: " + result.affectedRows);
         res.send(true);
       })
     conn.release();
  })
})

app.get('/article/saveItems', async (req, res) => {
  getConnection((conn) => {
    let sourceItems =JSON.parse(req.query.sourceItems);
    console.log("sourceItems : " + JSON.stringify(sourceItems));
    let release_id = req.query.release_id;
    let sql = 'insert into ERM.release_dtl (release_id, source_path) values ?';
    let values = [];
    
    sourceItems.forEach(item => {
      let ItemArray = [];
      ItemArray.push(release_id, item.value1);
      values.push(ItemArray);
    })
    console.log(values)

      conn.query(sql, [values], function(err, result){
        if(err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.send(true);
      })
      conn.release();
  })
})

//배포내용 수정
app.get('/article/update', async (req, res) => {
  getConnection((conn) => {
    let params=JSON.parse(req.query.data);
    console.log("params : " + JSON.stringify(params));
    //let release_id = params.release_id;
    let sql = 'update ERM.release set release_dt=?, sys_code=?, work_code=?, content=? where release_id = ?';
    var values = [
      params.register_dt, params.sys_code, params.work_code, params.content, params.release_id
      ];
       conn.query(sql, values, function(err, result){
         if(err) throw err;
         console.log(result)
         console.log("Number of records updated: " + result.affectedRows);
         res.send(true);
       })
     conn.release();
  })
})

app.get('/article/deleteItems', async (req, res) => {
  getConnection((conn) => {
    let release_id = req.query.release_id;
    console.log("release_id : " + release_id);
    let sql = 'delete from ERM.release_dtl where release_id = ?';
      conn.query(sql ,req.query.release_id, function(err, rows){
        if(err) throw err;
        console.log("Number of records deleted: " + rows.affectedRows);
        res.send(true);
      })
      conn.release();
  })
})

//배포내용 삭제
app.get('/article/delete', (req, res) => {
  console.log(req.query.data)
  let params=JSON.parse(req.query.data);
  console.log(params);
  let sql = 'insert into ERM.release (release_id, release_dt, sys_code, work_code, content) values(?)';
  var values = [
    [params.release_id, params.register_dt, params.sys_code, params.work_code, params.content]
    ];
    conn.query(sql, values, function(err, result){
      if (err) throw err;
      if (result.affectedRows < 1){
        console.log("release inserting job failed");
        res.send(false);
      }
      console.log("Number of records inserted: " + result.affectedRows);
      res.send(true);
     });
})

app.get('/article/selectReleaseObject', (req, res) => {
  console.log("release_id : " + req.query.release_id);
  getConnection((conn) => {
    let sql = 'select * from ERM.release where release_id = ?;'
    conn.query(sql ,req.query.release_id, function(err, rows){
      if (err) throw err;
      console.log(JSON.stringify(rows[0]));
      if(rows.length > 0 && rows.length < 2 && JSON.stringify(rows[0])){
        res.send(JSON.stringify(rows[0]));
      }else{
      res.send(false)
      }
    })
    conn.release();
  })
})

app.get('/article/selectReleaseObjectItems', (req, res) => {
  getConnection((conn) => {
    let sql = 'select * from ERM.release_dtl where release_id = ?;'
    conn.query(sql ,req.query.release_id, function(err, rows){
      if (err) throw err;
      console.log(JSON.stringify(rows));
      if(rows.length > 0 && JSON.stringify(rows)){
        console.log("rows : true");
        res.send(JSON.stringify(rows));
      }else{
        console.log("rows : false");
      res.send(false)
      }
    })
    conn.release();
  })
})

module.exports = {
  path: '/api',
  handler: app
}