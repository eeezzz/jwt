import express from "express"
import userCtrl from "../controllers/user.controller"

const router = express.Router()

router.route('/')
  .get(userCtrl.UserGet)
  .post(userCtrl.UserPost)

router.route('/:user_id')
  .put(userCtrl.UserPut)
  .delete(userCtrl.UserDELETE)


export default router