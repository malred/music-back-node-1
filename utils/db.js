var mysql = require("mysql2");
// 获取数据库连接池
var pool = mysql.createPool({
  host: "containers-us-west-109.railway.app",
  // host: "localhost",
  port: 6390,
  // port: 3307,
  database: "music",
  user: "root",
  password: "nFNWD8a7KSaLLbDaN2uO",
  // password: "123456",
  // select返回的从数组对象改为数组
  rowsAsArray: true,
  //强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回，
  // 而不是一javascript Date对象返回. (默认: false)
  dateStrings: true,
});
export default pool.promise();
