import User from "../models/user.js";
import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";
const secreatKey = process.env.secreatKey;

class middleware {
    // static auth = async (req, res, next) => {
    //     const { authorization } = req.headers;

    //     let token;
    //     if (authorization?.startsWith("Bearer")) { //Role && Role==admin
    //         try {
    //             token = authorization?.split(" ")[1]; //optional chaining
    //             const { userId } = jwt.verify(token, process.env.secreatKey)
    //             console.log(userId);
    //             console.log(token, "15");
    //             req.user = await user.findById(userId);
    //             console.log(req.user, "16");//import user
    //             next();
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     // console.log(token, "56");
    //     if (!token) {
    //         res.send({
    //             status: "failed",
    //             msg: "authentication failed",
    //         })
    //     }


    // }

    static auth = async (req, res, next) => {
        const { authorization } = req.headers;
        // console.log(authorization.split(" ")[1]);
        let token;
        if (authorization?.startsWith("Bearer")) {
            try {
                token = authorization?.split(" ")[1]; //optional chaining
                console.log(token);
                console.log(process.env.secreatKey);
                // const { userId, Role } = jwt.verify(token, process.env.secreatKey)
                const { user } = jwt.verify(token, process.env.secreatKey)
                console.log(user, "456");
                // if (Role && Role == "Admin") {
                //     req.user = await Admin.findById(userId);
                //     console.log(req.user, "46");
                // } else {
                //     req.user = await User.findOne({ _id: userId });
                //     console.log(req.user, "49");
                // }
                // console.log(req.user, "rgjh");import user
                req.user = user;
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

    static admin = (req, res, next) => {
        const { Role } = req.user;

        if (Role == "Admin") {
            next();
        } else {
            res.send({
                status: "failed",
                msg: "Admin authentication failed"
            })
        }

    }

}
export default middleware

