import { Router } from "express";
const router = Router()
import { userRegisterRoute,userLoginRoute,userLoginPage,chatDashBoard } from "../controllers/userController.js";



router.route("/register").post(userRegisterRoute)
router.route("/login").get(userLoginPage).post(userLoginRoute)
router.route("/chatboard").get(chatDashBoard)





export default router