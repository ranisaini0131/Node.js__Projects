import Admin from "../models/admin.js";
import Student from "../models/student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class adminController {
    static adminSignup = async (req, res) => {
        try {
            console.log(req.body);
            const admin = new Admin(req.body);
            await admin.save()
            res.send({
                status: "success",
                msg: "Signup successful"
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    static adminLogin = async (req, res) => {
        try {
            const { phone, email, name, password } = req.body;
            console.log(req.body);
            const alreadyAdmin = await Admin.findOne({ phone });
            console.log(alreadyAdmin, "30");

            if (!alreadyAdmin) {
                console.log("Your number is not registered");
            } else {
                const isMatch = await bcrypt.compare(password, alreadyAdmin.password) //alreadypassword id hadhed password saved in database
                console.log(isMatch);
                if (isMatch) {
                    //
                    const token = jwt.sign({
                        userID: alreadyAdmin._id,
                        Role: alreadyAdmin.Role
                    },
                        process.env.secreatKey,// required for verifying 
                        { expiresIn: "2d" }
                    )//
                    res.send({
                        status: "success",
                        msg: "login successsful",
                        token: token
                    })
                }
                else {
                    res.send({
                        status: "failed",
                        msg: "wrong password"
                    })
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    static addClass = async (req, res) => {
        try {
            console.log(req.body);
            if (!req.body) {
                res.send({
                    status: "failed",
                    msg: "Please fill all Data"
                })
            }
            else {
                const classes = new Class(req.body);
                await classes.save()
                res.send({
                    status: "success",
                    msg: "Class added successfully"
                })
            }
            //req.body, req.header, req.query, req.params
        } catch (error) {
            console.log(error);
        }
    }

    static updateAdminProfile = async (req, res) => {
        try {
            await Student.findByIdAndUpdate(req.user._id, req.body)
            res.send({
                "status": "success",
                msg: "profile successfully updated"
            })
        } catch (error) {
            res.send({
                "status": "failed",
                msg: "not updated"
            })
        }


    }

    static updateSuperAdminProfile = async (req, res) => {
        try {
            await Admin.findByIdAndUpdate(req.user._id, req.body)
            res.send({
                "status": "success",
                msg: "profile successfully updated"
            })
        } catch (error) {
            res.send({
                "status": "failed",
                msg: "not updated"
            })
        }
    }

    static updateAnyProfile = async (req, res) => {
        try {
            const { userID, name, phone, email } = req.body;
            const data = { name, phone, email } // ye wale name,  
            await Student.findByIdAndUpdate(userID, data);
            res.send({
                "status": "success",
                msg: "profile successfully updated"
            })
        }
        catch (error) {
            console.log(error);
            res.send(error);

        }
    }

    static changeRoleApi = async (req, res) => {
        try {
            const { _id, Role } = req.body;
            const data = { Role }
            await Student.findByIdAndUpdate(_id, data);
            res.send({
                "status": "success",
                msg: "profile successfully updated"
            })
        }
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}



export default adminController;

//updateadminprofile auth authenticate adminAuthenticate

//supersdmin can change roll of anybody

//STUDENT ADDRESS 