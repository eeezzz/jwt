import express from "express"
import validate from "express-validation"
import userCtrl from "../controllers/user.controller"
// import paramValidation from "../../config/param-validation"

const router = express.Router()

router
  .route('/login')
  .post(userCtrl.userLogin)

router
  .route("/")
  .get(userCtrl.UserGet)
  .post(userCtrl.UserPost);
  // .post(validate(paramValidation.createUser), userCtrl.UserPost)

router.route('/:user_id')
  .put(userCtrl.UserPut)
  .delete(userCtrl.UserDELETE)


export default router