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
        let result=JSON.parse(JSON.stringify(rows))
        console.log(result)
        let resultCount = Object.keys(result).length
        if(resultCount < 1){
          console.log("조회 실패")
          res.send(false)
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
      let resultCount = result.length
      console.log(("resultCount : " + resultCount))
      if (resultCount < 1) {
        console.log("maxId is none.");
      }
      console.log("query select maxId")
      maxId = result[0].maxId
      var regex = /[^0-9]/g;
      nextId = maxId.replace(regex, "");
      nextId = parseInt(nextId) + 1;
      nextId = "000000" + nextId
      nextId = nextId.slice(-6)
      console.log("nextId : " + nextId);
      res.send(nextId)
    })
    conn.release();
  })
})

app.get('/article/save', async (req, res) => {
  getConnection((conn) => {
    console.log(req.query.data)
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

app.get('/article/itemSave', async (req, res) => {
  getConnection((conn) => {
    console.log(req.query.sourceItems)
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
app.get('/article/update', (req, res) => {
  console.log(req.query.data)
  let params=JSON.parse(req.query.data);
  console.log(params);
  let params2=JSON.parse(req.query.data2);
  let sql = 'insert into ERM.release (, release_dt, sys_code, work_code, content) values(?)';
  var values = [
    [params.release_id, params.register_dt, params.sys_code, params.work_code, params.content]
    ];
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

function insertSourceItem(Items, maxId) {
  console.log("Items is : " + Items)
  
  sql = 'insert into ERM.release (release_id, source_path) values(?)';

  Items.forEach(source => {
    console.log("source : " + source.value1)
  });
  var values = [
    [maxId, source.value1]
    ];
    // conn.query(sql, values, function(err, result){
    //   if (err) throw err;
    //   if (result.affectedRows < 1){
    //     console.log("release inserting job failed");
    //     res.send(false);
    //   }
    //   console.log("Number of records inserted: " + result.affectedRows);
    //   res.send(true);
    //  });

    let sql = 'insert into ERM.release_dtl (release_id, release_dt, sys_code, work_code, content) values(?)';
    var values = [
      [maxId, params.register_dt, params.sys_code, params.work_code, params.content]
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
}

module.exports = {
  path: '/api',
  handler: app
}