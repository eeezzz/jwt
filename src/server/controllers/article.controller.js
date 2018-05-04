// article.controller.js
import articleModule from '../modules/article.module'


// aritcle GET JWT取得個人文章
const articlePersonalGet = (req, res) => {
  console.log(req.token)
  articleModule.selectPersonalArticle(req.token)
    .then((result) => {
      res.send(result)
    })
    .catch((err)=> { 
      return res.status(401).send(err)
    })
}

// article POST 新增
const articlePost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body
  articleModule.createArticle(insertValues).then((result) => {
    res.send(result)  // 成功回傳 result 結果
  }).catch((err) => {
    return res.send(err)
  })
}

// article GET 取得
const articleGet = (req, res) => {
  articleModule.selectArticle().then((result) => {
    res.send(result)
  }).catch((err) => {
    return res.send(err)
  })
}

//article PUT 修改
const articlePut = (req, res) => {
  const insertValues = req.body
  console.log('insertValues',insertValues)
  const userId = req.params.article_id
  articleModule
    .modifyArticle(insertValues, userId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.send(err);
    });

}

//article DELETE 刪除
const articleDELETE = (req, res) => {
  const userId = req.params.article_id;
  articleModule
    .deleteArticle(userId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.send(err)
    });
};

export default {
  articlePost,
  articleGet,
  articlePut,
  articleDELETE,
  articlePersonalGet
};

// export default articleCtrl