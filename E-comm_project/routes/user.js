import express from "express";
import userController from "../controllers/user.js";
import middleware from "../middlewares/required.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

//import middlewares
const { auth, admin } = middleware;

// router.use('/editeProfile', upload.fields([{ name: "userImage", maxCount: 1 }]))
//postRequest
router.post('/userSignup', userController.userSignup);
router.post('/userLogin', userController.userLogin);


//getRequestimport express
router.get('/getAddress', auth, userController.getAddress);
router.get('/getProfile', auth, userController.getProfile);




//PatchRequest
router.patch('/changePassword', auth, userController.changePassword);
router.post('/addAddress', auth, userController.addAddress);
router.patch('/editProfile', auth, upload.fields([{ name: "userImage", maxCount: 1 }]), userController.editProfile);






export default router;