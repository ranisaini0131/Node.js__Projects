import Admin from "../models/admin.js";
import Address from "../models/address.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class adminController {

    static adminSignup = async (req, res) => {
        try {
            console.log(req.body);
            const admin = new Admin(req.body);
            await admin.save();
            res.send({
                status: "success",
                msg: "Signup successful"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static adminLogin = async (req, res) => {
        try {
            const { phone, password } = req.body;
            console.log(req.body, "24");
            const existedAdmin = await Admin.findOne({ phone });
            console.log(existedAdmin, "26");

            if (!existedAdmin) {
                console.log("Your numberis not registered");
            } else {
                const isMatch = await bcrypt.compare(password, existedAdmin.password) //alreadypassword id hadhed password saved in database
                console.log(isMatch);
                if (isMatch) {
                    //
                    const token = jwt.sign({
                        user: existedAdmin
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

    static editAdminProfile = async (req, res) => {
        try {
            console.log(req.user);
            console.log(req.body.name, "62");
            await Admin.findByIdAndUpdate(req.user._id, req.body); // gives one data by id in object form
            res.send({
                "status": "success",
                msg: "profile successfully updated"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static getAllAddresses = async (req, res) => {
        try {
            const address = await Address.find();
            res.send(address)
        } catch (error) {
            res.send({
                status: "failed",
                msg: "no addres found"
            })
        }
    }
}

export default adminController;