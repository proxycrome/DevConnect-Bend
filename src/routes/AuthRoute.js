import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = Router();
 
router.route('/register').post(AuthController.devSignUp);
router.route('/login').post(AuthController.devLogin);
router.route('/employer/register').post(AuthController.empSignup);
router.route('/employer/login').post(AuthController.empLogin)


export default router;