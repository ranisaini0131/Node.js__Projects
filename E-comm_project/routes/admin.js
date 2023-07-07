import express from "express";
import adminController from "../controllers/admin.js";
import middleware from "../middlewares/required.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

const { auth, admin } = middleware;

router.post('/adminSignup', adminController.adminSignup);
router.post('/adminLogin', adminController.adminLogin);

//patchRequest

router.patch('/editAdminProfile', auth, admin, adminController.editAdminProfile);

//getRequest
router.get('/getAllAddresses', auth, admin, adminController.getAllAddresses);

export default router