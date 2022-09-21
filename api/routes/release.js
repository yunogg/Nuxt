const { Router } = require('express');
const app = Router();

var getConnection = require('../db');

app.get('/select', (req, res) => {

  getConnection((conn) => {
  let sql = 'select * from ERM.release where del_yn = "N" order by release_id DESC;'
  conn.query(sql ,req.query.id, function(err, rows){
      if(!err){
        if(!rows) console.log(rows);
        let result=JSON.parse(JSON.stringify(rows))
        //console.log(result)
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

app.get('/makeReleaseId', async (req, res) => {
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

app.get('/save', async (req, res) => {
  getConnection((conn) => {
    let params=JSON.parse(req.query.data);
    console.log("params : " + JSON.stringify(params));
    let release_id = req.query.release_id;
    let sql = 'insert into ERM.release (release_id, release_dt, sys_code, work_code, content) values(?)';
    var values = [
      [params.release_id, params.release_dt, params.sys_code, params.work_code, params.content]
      ];
       conn.query(sql, values, function(err, result){
         if(err) throw err;
         console.log("Number of records inserted: " + result.affectedRows);
         res.send(true);
       })
     conn.release();
  })
})

app.get('/saveItems', async (req, res) => {
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
app.get('/update', async (req, res) => {
  getConnection((conn) => {
    let params=JSON.parse(req.query.data);
    console.log("params : " + JSON.stringify(params));
    //let release_id = params.release_id;
    let sql = 'update ERM.release set release_dt=?, sys_code=?, work_code=?, content=? where release_id = ?';
    var values = [
      params.release_dt, params.sys_code, params.work_code, params.content, params.release_id
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

app.get('/deleteItems', async (req, res) => {
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
app.get('/delete', (req, res) => {
  getConnection((conn) => {
    let release_id = req.query.release_id;
  //let sql = 'insert into ERM.release (release_id, release_dt, sys_code, work_code, content) values(?)';
    let sql = 'update ERM.release set del_yn="Y" where release_id = ?';
    conn.query(sql ,req.query.release_id, function(err, rows){
      if(err) throw err;
      console.log("Number of records updated: " + rows.affectedRows);
      res.send(true);
    })
    conn.release();
  })
})

app.get('/selectReleaseObject', (req, res) => {
  console.log("release_id : " + req.query.release_id);
  getConnection((conn) => {
    let sql = 'select * from ERM.release where release_id = ?;'
    conn.query(sql ,req.query.release_id, function(err, rows){
      if (err) throw err;
      //console.log(JSON.stringify(rows[0]));
      if(rows.length > 0 && rows.length < 2 && JSON.stringify(rows[0])){
        res.send(JSON.stringify(rows[0]));
      }else{
      res.send(false)
      }
    })
    conn.release();
  })
})

app.get('/selectReleaseObjectItems', (req, res) => {
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

app.get('/approveReleaseObject', (req, res) => {
  getConnection((conn) => {
    let release_id = req.query.release_id;
  //let sql = 'insert into ERM.release (release_id, release_dt, sys_code, work_code, content) values(?)';
    let sql = 'update ERM.release set approve_YN="Y" where release_id = ?';
    conn.query(sql ,req.query.release_id, function(err, rows){
      if(err) throw err;
      console.log("Number of records updated: " + rows.affectedRows);
      res.send(true);
    })
    conn.release();
  })
})

app.get('/cancelReleaseObject', (req, res) => {
  getConnection((conn) => {
    let release_id = req.query.release_id;
  //let sql = 'insert into ERM.release (release_id, release_dt, sys_code, work_code, content) values(?)';
    let sql = 'update ERM.release set approve_YN="N" where release_id = ?';
    conn.query(sql ,req.query.release_id, function(err, rows){
      if(err) throw err;
      console.log("Number of records updated: " + rows.affectedRows);
      res.send(true);
    })
    conn.release();
  })
})
// (2) controller를 사용하여 설정
//const sampleController = require('../controller/sampleController');
//router.post('/test', sampleController.test);

module.exports = app;