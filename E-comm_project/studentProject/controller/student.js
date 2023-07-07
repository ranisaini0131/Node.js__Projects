import Student from "../models/student.js";
import Result from "../models/result.js";
import Address from "../models/address.js";
import studentCart from "../models/cart.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Validator from "node-input-validator";
const secreatKey = process.env.secreatKey;


class studentController {

    static studentSignup = async (req, res) => {
        try {
            console.log(req.body);
            const student = new Student(req.body);
            await student.save();
            res.send({
                status: "success",
                message: "Student signup successful"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static studentLogin = async (req, res) => {
        try {
            const { phone, email, name, password } = req.body;
            console.log(req.body);
            const alreadyStudent = await Student.findOne({ phone });
            console.log(alreadyStudent, "30");

            if (!alreadyStudent) {
                console.log("Your number is not registered");
            } else {
                const isMatch = await bcrypt.compare(password, alreadyStudent.password) //alreadypassword id handled password saved in database
                console.log(isMatch);
                if (isMatch) {
                    //
                    const token = jwt.sign({
                        userID: alreadyStudent._id,
                        Role: alreadyStudent.Role
                    },
                        process.env.secreatKey,// required for verifying 
                        { expiresIn: "1d" }
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

    static getProfile = async (req, res) => {
        // res.send(req.user); //chla k dekhna
        // const user = await Student.find(); // gives all data in array form
        // const user = await Student.find({ name: "Harsh" }); // gives 1 data in array form
        // const user = await Student.findOne({ name: "Harsh" }); // gives one data in object form
        const user = await Student.findById("645357e2627c616f8beeb768"); // gives one data by id in object form

        console.log(user)
        res.send(user)
    }

    static editProfile = async (req, res) => {
        try {
            //     const user = await Student.findByIdAndUpdate("645357e2627c616f8beeb768", { email: req.body.email }); // gives one data by id in object form
            await Student.findOneAndUpdate({ _id: "645a2c85d81ea1a63b10877a" }, { email: req.body.email }); // gives one data by id in object form
            res.send({
                status: "success",
                msg: "data updated"
            })

        } catch (error) {
        }
    }

    static getAllStudent = async (req, res) => {
        try {
            const allUsers = await Student.find();
            console.log(allUsers)
            res.send(allUsers);
        } catch (error) {
            console.log(error);
            res.send({
                status: "failed",
                msg: "no students"
            })
        }
    }

    static addResult = async (req, res) => {
        try {
            console.log(req.body);
            const { physics, chemistry, maths, rollno, phone } = req.body;
            let percentage = Math.round(((physics + chemistry + maths) / 300) * 100);
            console.log(percentage);

            if (physics < 33 || chemistry < 33 || maths < 33) {
                let division = "Fail";
                const result = new Result({ ...req.body, percentage, division });
                await result.save();
            } else {
                if (percentage > 60) {
                    let division = "1st Division";
                    const result = new Result({ ...req.body, percentage, division });
                    await result.save();
                }

                if (percentage < 60) {
                    let division = "2nd Division";
                    const result = new Result({ ...req.body, percentage, division });
                    await result.save();
                }
            }


            res.send({
                status: "success",
                msg: "student result"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static getResult = async (req, res) => {
        try {
            console.log(req.params.phone);
            const studentResult = await Result.find({ phone: req.params.phone }); //gives the object
            console.log(studentResult[0].chemistry)
            res.json(studentResult[0].chemistry);
        } catch (error) {
            console.log(error);
            res.send({
                status: "failed",
                msg: "no students"
            })
        }
    }


    static changePassword = async (req, res) => {
        try {
            const { password, email, phone } = req.user; // req.user meams token se aaega data
            const { old_password, new_password } = req.body //req.body means frontend se data aara h
            console.log(req.user, "156")
            console.log(password, "hgdwhjd");
            console.log(old_password, "158");
            const isMatch = await bcrypt.compare(old_password, password)
            if (isMatch) {
                const salt = await bcrypt.genSalt(12);
                const newHashPassword = await bcrypt.hash(new_password, salt)
                await Student.findOneAndUpdate({ phone: req.user.phone }, { password: newHashPassword }); //gives the object

                res.send({
                    "status": "successful",
                    msg: "password change successfulluy"
                })

            }

            else {
                res.send({
                    "status": "failed",
                    msg: "password change successfulluy, old paasword wrong"
                })
            }

        } catch (error) {
            res.json(error);
        }

    }


    static updateStudentProfile = async (req, res) => {
        try {
            // await Student.findOneAndUpdate({ _id: req.user._id }, { email: req.body.email }, { name: req.body.name });
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

    static addAddress = async (req, res) => {
        try {
            console.log(req.body, req.user);
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

    static getMyAddress = async (req, res) => {
        try {
            console.log(req.user);
            const data = await Address.findOne({ userId: req.user._id });
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    static updateAddress = async (req, res) => {
        try {
            console.log(req.user);
            await Address.findOneAndUpdate({ userId: req.user._id }, req.body);
            res.send({
                status: "success",
                msg: "address updated successfully"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static addCart = async (req, res) => {
        try {
            const cart = new studentCart(req.body);
            await cart.save()
            res.send({
                status: "success",
                msg: "cart added successfully"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static getCart = async (req, res) => {
        try {
            const cart = await studentCart.find().populate("orderById"); //find({orderById:req.user._id})
            res.send(cart);
        } catch (error) {
            console.log(error);
        }
    }

    static getMyCart = async (req, res) => {
        try {
            const cart = await studentCart.find({ orderById: req.user._id }).populate("orderById");

        } catch (error) {
            console.log(error);
        }
    }
}



//schema.find({name:name}), schema.findOne(), schema.find(), schema.findById(), findByIdAndUpdate(), findOneAndUpdate(), findOneAndDelete(), findByIdAndDelete(),



//getAllStudent = find()
//
//changePassword api jo ki authenticate rhegy new password should be hashed
//bcrypt usekrk match krna h findoneand update salt use krkr password hash

//updateProfile of student auth middileware










export default studentController;