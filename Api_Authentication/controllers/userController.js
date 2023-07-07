import User from "../models/User.js "
import bcrypt from "bcrypt" // for hashing
import jwt from "jsonwebtoken" // for generating token
import userModel from "../models/User.js"
// const secreatKey = "ghjkvyjhjkl,jk,j"
class userController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body
        const user = await userModel.findOne({ email: email })
        //1st email is from database and second is which user gives us so we are checking usergiven email is present in database(userModel) or not
        if (user) {
            res.send({
                "status": "failed",
                "msg": "Email already exists"
            })
        } else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(12)
                        const hashPassword = await bcrypt.hash(password, salt)

                        const newUser = new userModel({
                            // name: name, both are same so we can wwrite it once
                            name,
                            email,
                            password: hashPassword,
                            tc
                        })
                        await newUser.save()
                        const savedUser = await userModel.findOne({ email: email });
                        //Generate JWT Token
                        const token = jwt.sign({ userID: savedUser._id }, process.env.secreatKey, { expiresIn: "5d" })
                        res.status(201).send({
                            "status": "success",
                            "msg": "Registeration Successfull",
                            token: token
                        })
                    } catch (error) {
                        console.log(error)
                        res.send({
                            "status": "failed",
                            "msg": "Unable to register"
                        })
                    }

                } else {
                    res.send({
                        "status": "failed",
                        "msg": "password and confirm password doesn't match"
                    })
                }
            } else {
                res.send({
                    "status": "failed",
                    "msg": "All feilds are required"
                })
            }
        }

    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await userModel.findOne({ email: email })
                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)//(user.password)user me email k sath password bhi mil jaega //1st password is from database and 2nd we are getting from user
                    if ((email == user.email) && isMatched) {
                        //Generate JWT Token
                        const token = jwt.sign({ userID: user._id }, process.env.secreatKey, { expiresIn: "5d" })
                        res.send({
                            "status": "success",
                            "msg": "Login Successfull",
                            "token": token
                        })
                    } else {
                        res.send({
                            "status": "failed",
                            "msg": "Invalid email or password"
                        })
                    }
                } else {
                    res.send({
                        "status": "failed",
                        "msg": "you are not a Registered user!"
                    })
                }
            } else {
                res.send({
                    "status": "failed",
                    "msg": "All feilds are required"
                })
            }
        } catch (error) {
            clg(error)
            res.send({
                "status": "failed",
                "msg": "Unable to Login"
            })
        }
    }

    static changePassword = async (req, res) => {
        const { password, password_confirmation } = req.body
        if (password && password_confirmation) {
            if (password === password_confirmation) {
                const salt = await bcrypt.genSalt(10)
                const newhashPassword = await bcrypt.hash(password, salt)

                res.send({
                    "status": "success",
                    "msg": "password changes successfully"
                })
            } else {
                res.send({
                    "status": "failed",
                    "msg": "password and password_confirmation doesn't match"
                })
            }
        } else {
            res.send({
                "status": "failed",
                "msg": "All fields are required"
            })
        }
    }
}

export default userController