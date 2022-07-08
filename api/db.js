const mariadb = require('mysql')
const config = require('./db_config.json');

// const conn = mariadb.createConnection({
// 	host: "localhost", // aws ec2 도메인 주소
// 	port: "3306", // aws ec2에 연결된 security group에서 허용한 port 번호
// 	user: "root", // mariaDB 접속계정
// 	password: "admin", // mariaDB 접속계정의 비밀번호
// 	database: "ERM", // 연결시킬 database 이름
//   });

let pool = mariadb.createPool(config);

function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if(!err) {
      callback(conn);
    }
  });
}


module.exports = getConnection;