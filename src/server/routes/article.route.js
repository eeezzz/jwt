import express from 'express'
import articleCtrl from '../controllers/article.controller'

const router = express.Router()

router.route('/')
  .get(articleCtrl.articleGet)
  .post(articleCtrl.articlePost)

router.route('/:article_id')
  .put(articleCtrl.articlePut)
  .delete(articleCtrl.articleDELETE)

export default router