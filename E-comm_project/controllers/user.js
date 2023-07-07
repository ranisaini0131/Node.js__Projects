import User from "../models/user.js";
import Address from "../models/address.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secreatKey = process.env.secreatKey;



class userController {
    static userSignup = async (req, res) => {
        try {
            console.log(req.body);
            const newUser = new User(req.body);
            await newUser.save();
            res.send({
                status: "success",
                message: "User signup successful"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static userLogin = async (req, res) => {

        try {
            const { name, email, phone, password } = req.body;
            const existingUser = await User.findOne({ email });

            console.log(existingUser, "28");
            if (!existingUser) {
                console.log("your email is not registered");
            } else {
                // console.log("user existed");
                const isMatched = await bcrypt.compare(password, existingUser.password);

                if (isMatched) {
                    const token = jwt.sign({
                        user: existingUser
                    },
                        process.env.secreatKey,
                        { expiresIn: "3d" }
                    )

                    res.send({
                        status: "success",
                        message: "User Login successful",
                        token: token
                    })
                } else {
                    res.send({
                        status: "failed",
                        message: "User Login unsuccessful"
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    static editProfile = async (req, res) => {
        try {
            console.log(req.user);
            console.log(req.body.name, "62");
            console.log(req.files.userImage[0], "63");
            const userImage = req.files.userImage[0].filename
            const data = { ...req.body, userImage };
            await User.findByIdAndUpdate(req.user._id, data); // gives one data by id in object form
            res.send({
                "status": "success",
                msg: "profile successfully updated"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static changePassword = async (req, res) => {
        try {
            const { password, email, _id } = req.user;
            const { old_password, new_password } = req.body;
            // console.log(req.user, "81")
            const isMatched = await bcrypt.compare(old_password, password);

            if (isMatched) {
                const salt = await bcrypt.genSalt(12);
                const newHashPassword = await bcrypt.hash(password, salt);
                await User.findByIdAndUpdate(_id, { password: newHashPassword })
            }
            res.send({
                "status": "successful",
                msg: "password change successfully"
            })

        } catch (error) {
            console.log(error);
        }
    }

    static addAddress = async (req, res,) => {
        try {
            console.log(req.body, req.user, "102");
            let data = { ...req.body, userId: req.user._id }
            const add = new Address(data);
            await add.save()//Address me save
            res.send({
                status: "success",
                msg: "student address added  successfully"
            })
        } catch (error) {
            console.log(error)
        }
    }

    static getAddress = async (req, res) => {
        try {
            console.log(req.user);
            const data = await Address.findOne({ userId: req.user._id }).populate("userId")
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }
    static getProfile = async (req, res) => {
        try {
            console.log(req.user);
            res.send(req.user)
        } catch (error) {
            console.log(error);
        }
    }
}



export default userController;