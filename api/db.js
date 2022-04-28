const mariadb = require('mysql')

const conn = mariadb.createConnection({
	host: "localhost", // aws ec2 도메인 주소
	port: "3306", // aws ec2에 연결된 security group에서 허용한 port 번호
	user: "root", // mariaDB 접속계정
	password: "admin", // mariaDB 접속계정의 비밀번호
	database: "ERM", // 연결시킬 database 이름
  });

module.exports = conn;