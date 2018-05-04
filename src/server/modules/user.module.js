// User.module.js
import mysql from "mysql"
import config from "../../config/config"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

// User POST (login)登入取得資訊
const selectUserLogin = insertValues => {
  console.log(insertValues)
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          "SELECT * FROM User WHERE user_mail = ?",
          insertValues.user_mail,
          (error, result) => {
            if (error) {
              console.error("SQL error: ", error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else if (Object.keys(result).length === 0) {
              resolve("信箱尚未註冊！");
            } else {
              const dbHashPassword = result[0].user_password;
              const userPassword = insertValues.user_password;
              bcrypt
                .compare(userPassword, dbHashPassword)
                .then(res => {
                  if (res) {
                    // 產生JWT
                    const playload = {
                      user_id: result[0].user_id,
                      user_name: result[0].user_name,
                      user_mail: result[0].user_mail
                    }
                    console.log(Math.floor(Date.now()/1000))
                    const token = jwt.sign({playload, exp: Math.floor(Date.now() / 1000) + (60 * 480) }, 'my_secret_key')
                    // resolve("登入成功");
                    resolve(Object.assign( { code: 200 }, { message: "登入成功" }, { token } ))
                  } else {
                    resolve("您輸入的密碼有誤");
                  }
                });
            }
            connection.release();
          }
        );

      }
    });
  });
};

// User POST 新增
const createUser = insertValues => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          "INSERT INTO User SET ?",
          insertValues,
          (error, result) => {
            if (error) {
              console.error("SQL error: ", error);
              reject(error);
            } else if (result.affectedRows === 1) {
              resolve(`新增成功！ User_id: ${result.insertId}`)
            }
            connection.release()
          }
        );
      }
    });
  });
};

// User GET 取得
const selectUser = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(`select * from User`, (error, result) => {
          if (error) {
            console.log("SQL error:", error)
            reject(error)
          } else {
            resolve(result);
          }
          connection.release();
        });
      }
    });
  });
};

//User PUT 修改
const modifyUser = (insertValues, userId) => {
  console.log("value", insertValues);
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          "UPDATE User SET ? WHERE User_id = ?",
          [insertValues, userId],
          (error, result) => {
            if (error) {
              console.log("SQL error", error);
              reject(error);
            } else if (result.affectedRows === 0) {
              resolve("請確認修改ID！");
            } else if (result.message.match("Changed: 1")) {
              console.log(result.message);
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

//User DELETE 刪除
const deleteUser = userId => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          "delete from User WHERE User_id = ?",
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
  createUser,
  selectUser,
  modifyUser,
  deleteUser,
  selectUserLogin
}
