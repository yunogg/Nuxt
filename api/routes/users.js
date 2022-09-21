import { SHA256 } from 'crypto-js';
const { Router } = require('express');
const app = Router();

var getConnection = require('../db');
// (1) METHOD를 사용하여 설정

app.get('/selectAllUserObject', (req, res) => {
  getConnection((conn) => {
  let sql = 'select * from ERM.user where use_yn = "Y" order by user_no DESC;'
  conn.query(sql ,req.query.id, function(err, rows){
      if(!err){
        if(!rows) console.log(rows);
        let result=JSON.parse(JSON.stringify(rows))
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

app.get('/selectUserObject', (req, res) => {
  getConnection((conn) => {
    let sql = 'select * from ERM.user where use_yn = "Y" and user_id = ? order by user_no DESC;'
    conn.query(sql, req.query.user_id, function(err, rows){
      if(!err){
        if(!rows) console.log(rows);
        let result=JSON.parse(JSON.stringify(rows))
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
app.get('/save', (req, res) => {
  console.log("사용자 등록");
  getConnection((conn) => {
    let params=JSON.parse(req.query.data);
    let sql = 'insert into ERM.user (user_no, user_id, user_nm, dept_nm, user_tel, user_auth, user_role, user_mail, user_pw, use_yn, register_dt, update_dt) values((SELECT NVL(MAX(user_no), 0) + 1 FROM ERM.user x),?, "Y", DATE_FORMAT(Now(), "%Y-%m-%d %H:%i:%S"), DATE_FORMAT(Now(), "%Y-%m-%d %H:%i:%S"))';
    var values = [
      [params.user_id, params.user_nm, params.dept_nm, params.user_tel, params.user_auth, params.user_role, params.user_mail, SHA256("ebs1@#")]
      ];
    conn.query(sql, values, function(err, result){
      if(err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
      res.send(true);
    })
    conn.release();
  })
})
app.get('/update', (req, res) => {
  console.log("사용자 등록");
  getConnection((conn) => {
    let params=JSON.parse(req.query.data);
    let sql = 'update ERM.user set use_yn="Y", update_dt=DATE_FORMAT(Now(), "%Y-%m-%d %H:%i:%S"), user_nm=?, dept_nm=?, user_tel=?, user_auth=?, user_role=?, user_mail=? where user_id=?';
    var values = [
      params.user_nm, params.dept_nm, params.user_tel, params.user_auth, params.user_role, params.user_mail, params.user_id
      ];
    conn.query(sql, values, function(err, result){
      if(err) throw err;
      console.log("Number of records updated: " + result.affectedRows);
      res.send(true);
    })
    conn.release();
  })
})
app.get('/delete', (req, res) => {
  console.log("사용자 삭제");
  getConnection((conn) => {
    let sql = 'delete from ERM.user where user_id = ?';
    conn.query(sql, req.query.user_id, function(err, result){
      if(err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      res.send(true);
    })
    conn.release();
  })
})
// (2) controller를 사용하여 설정
//const sampleController = require('../controller/sampleController');
//router.post('/test', sampleController.test);

module.exports = app;