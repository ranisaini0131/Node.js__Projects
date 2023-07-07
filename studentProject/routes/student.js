import express from "express";
import studentController from "../controller/student.js";
import middile from "../middlewares/required.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

//middleware
const { admin, auth, superAdmin } = middile;

router.use('/editProfilePic', upload.fields([{ name: "pImage", maxCount: 1 }]))
router.use('/editProfile', upload.fields([{ name: "pImage", maxCount: 1 }]))

//post
router.post("/studentSignup", studentController.studentSignup);
router.post("/studentLogin", studentController.studentLogin);
router.post("/addResult", auth, studentController.addResult);
router.post('/changePassword', auth, studentController.changePassword);
router.post('/addCart', studentController.addCart);

//getRequest
router.get('/getProfile', auth, studentController.getProfile);
router.get('/getAllStudent', auth, admin, studentController.getAllStudent);
router.get('/getResult/:phone', admin, studentController.getResult);
router.get('/getResult/:phone', admin, studentController.getResult);
router.get('/getCart', studentController.getCart);


//PatchReq
router.patch('/editProfile', auth, studentController.editProfile);
router.patch('/updateStudentProfile', auth, studentController.updateStudentProfile);
router.patch('/addAddress', auth, studentController.addAddress);
router.patch('/updateAddress', auth, studentController.updateAddress);

//get req
router.get('/getAllAddresses', studentController.getAllAddresses);
router.get('/getMyAddress', auth, studentController.getMyAddress);


export default router;