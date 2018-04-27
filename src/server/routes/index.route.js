import express from "express";
import mysql from 'mysql'

import config from "./../../config/config"

// Router
import article from './article.route'
import user from './user.route'


const router = express.Router();

router.use('/article', article)
router.use('/user', user)

/* GET localhost:[port]/api page. */
router.get("/", (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`)
});

// mysql 連線測試
router.get('/sqlTest', (req, res) => {
  const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
  })
  connectionPool.getConnection((err, connection) => {
    if (err) {
      res.send(err);
      // {"code":"ER_ACCESS_DENIED_ERROR","errno":1045,"sqlMessage":"Access denied for user 'root'@'localhost' (using password: YES)","sqlState":"28000","fatal":true}
      console.log('連線失敗')
    } else {
      res.send('連線成功')
      // console.log(connection)
    }
  })
})

export default router
