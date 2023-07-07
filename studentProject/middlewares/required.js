import jwt from "jsonwebtoken";
import Student from "../models/student.js";
import Admin from "../models/admin.js";
const secreatKey = process.env.secreatKey;

class middile {
    //to authenticate the user,verify toke
    // static authenticate = async (req, res, next) => {
    //     let token;
    //     const { authorization } = req.header;
    //     if (authorization && authorization.startsWith("Bearer")) {
    //         try {
    //             token = authorization.split(" ")[1];
    //             const { userID } = jwt.verify(token, secreatKey)
    //             req.user = await Student.findById(userID);
    //             next();

    //         } catch (error) {
    //             res.json(error);
    //         }
    //     }

    //     if (!token) {
    //         res.send({
    //             status: "failed",
    //             msg: "unauthorised user"
    //         })
    //     }
    // }

    static admin = async (req, res, next) => {
        if (req.user.Role !== "admin") {
            res.send({
                status: "failed",
                msg: "admin authentication failed",
            })
        }
        next();
    }

    static superAdmin = async (req, res, next) => {
        if (req.user.Role !== "superAdmin") {
            res.send({
                status: "failed",
                msg: "superAdmin authentication failed",
            })
        }
        next();
    }

    static auth = async (req, res, next) => {
        const { authorization } = req.headers;
        // console.log(authorization.split(" ")[1]);
        let token;
        if (authorization?.startsWith("Bearer")) {
            try {
                token = authorization?.split(" ")[1]; //optional chaining
                const { userID, Role } = jwt.verify(token, process.env.secreatKey)
                // console.log(userID);
                if (Role == "superAdmin") {
                    req.user = await Admin.findById(userID);
                } else {
                    req.user = await Student.findOne({ _id: userID });
                }
                // console.log(req.user, "rgjh");import user
                next();
            } catch (error) {
                console.log(error);
            }
        }
        // console.log(token, "56");
        if (!token) {
            res.send({
                status: "failed",
                msg: "authentication failed",
            })
        }


    }

}


export default middile;