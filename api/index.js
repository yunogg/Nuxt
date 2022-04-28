import express from 'express';
const app = express();
const conn = require('./db');
      conn.connect();

app.get('/', (req, res) => {
  console.log('/api/');

  //const maria = require("./api/db");
  
  conn.query('select * from user;', function(err, rows, fields){
    if(!err){
      console.log(rows)
      var result = 'rows: ' + JSON.stringify(rows) + '<br><br>' +
        'fields : ' + JSON.stringify(fields);
        res.send(result);
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