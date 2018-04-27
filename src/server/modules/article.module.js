// article.module.js
import mysql from "mysql";
import config from "../../config/config";

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

// article POST 新增
const createArticle = insertValues => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          "INSERT INTO article SET ?",
          insertValues,
          (error, result) => {
            if (error) {
              console.error("SQL error: ", error);
              reject(error);
            } else if (result.affectedRows === 1) {
              resolve(`新增成功！ article_id: ${result.insertId}`);
            }
            connection.release();
          }
        );
      }
    });
  });
};

// article GET 取得
const selectArticle = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(`select * from article`, (error, result) => {
          if (error) {
            console.log("SQL error:", error);
            reject(error);
          } else {
            resolve(result);
          }
          connection.release();
        });
      }
    });
  });
};

//article PUT 修改
const modifyArticle = (insertValues, userId) => {
  console.log('value',insertValues)
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          "UPDATE Article SET ? WHERE article_id = ?",
          [insertValues, userId],
          (error, result) => {
            if (error) {
              console.log("SQL error", error);
              reject(error);
            } else if (result.affectedRows === 0) {
              resolve("請確認修改ID！");
            } else if (result.message.match("Changed: 1")) {
              console.log(result.message)
              resolve("資料修改成功");
            } else {
              console.log(result.message);
              resolve("資料無異動");
            }
            connection.release();
          }
        );
      }
    });
  });
};

//article DELETE 刪除
const deleteArticle = (userId) => {

  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          "delete from Article WHERE article_id = ?",
          userId,
          (error, result) => {
            if (error) {
              console.log("SQL error", error);
              reject(error);
            } else if (result.affectedRows === 1) {
              resolve("刪除成功");
            } else {
              resolve("刪除失敗");
            }
            connection.release();
          }
        );
      }
    });
  });
};

export default {
  createArticle,
  selectArticle,
  modifyArticle,
  deleteArticle
};
