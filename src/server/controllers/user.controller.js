// User.controller.js
import UserModule from "../modules/User.module"

// User POST 新增
const UserPost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body
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
  UserDELETE
}
