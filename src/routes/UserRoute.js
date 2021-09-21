import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authValidator from "../middleware/AuthValidator.js";
import EmpValidator from "../middleware/EmpValidator.js";

const router = Router();

router.route('/dev').get(authValidator, UserController.getDevs)
router.route('/dev/:userId').patch(authValidator, UserController.editDev).get(authValidator, UserController.getDevById)
router.route('/employer').get(authValidator, UserController.getEmployers)
router.route('/employer/:employerId').patch(authValidator, UserController.editEmployer).get(authValidator, UserController.getEmployerById)
router.route('/employer/s/jobs').post(EmpValidator, UserController.addJobs)
router.route('/jobs').get(UserController.getJobs)
router.route('/jobs/:jobId').get(UserController.getJobById)

export default router;