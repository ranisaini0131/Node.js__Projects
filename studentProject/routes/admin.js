import express from "express";
import adminController from "../controller/admin.js";
import middile from "../middlewares/required.js";


const router = express.Router();

const { admin, auth, superAdmin } = middile;

router.post('/adminSignup', adminController.adminSignup);
router.post('/adminLogin', adminController.adminLogin);
router.post('/addClass', auth, admin, adminController.addClass);


//PATCH
router.patch('/updateAdminProfile', auth, admin, adminController.updateAdminProfile);
router.patch('/updateSuperAdminProfile', auth, superAdmin, adminController.updateSuperAdminProfile);
router.patch('/changeRoleApi', auth, superAdmin, adminController.changeRoleApi);


export default router;