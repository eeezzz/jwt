// User.controller.js
import UserModule from "../modules/User.module"
import bcrypt from "bcrypt"

// User POST (login)登入取得資訊
const userLogin = (req, res) => {
  // 取得帳密
  const insertValues = req.body
  UserModule
    .selectUserLogin(insertValues)
    .then(result => {
      res.send(result); // 成功回傳 result 結果
    })
    .catch(err => {
      return res.send(err);
    });
}

// User POST 新增
const UserPost = (req, res) => {
  // 取得新增參數
  // const insertValues = req.body
  const insertValues = {
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password, 10) // 密碼加密
  }
  UserModule
    .createUser(insertValues)
    .then(result => {
      res.send(result); // 成功回傳 result 結果
    })
    .catch(err => {
      return res.send(err)
    })
};

// User GET 取得
const UserGet = (req, res) => {
  UserModule
    .selectUser()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      return res.send(err)
    });
};

//User PUT 修改
const UserPut = (req, res) => {
  const insertValues = req.body;
  console.log("insertValues", insertValues);
  const userId = req.params.user_id;
  UserModule
    .modifyUser(insertValues, userId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.send(err);
    });
};

//User DELETE 刪除
const UserDELETE = (req, res) => {
  const userId = req.params.user_id;
  UserModule
    .deleteUser(userId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.send(err);
    });
};

export default {
  UserPost,
  UserGet,
  UserPut,
  UserDELETE,
  userLogin
};
