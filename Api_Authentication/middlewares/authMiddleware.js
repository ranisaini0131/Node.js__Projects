import jwt from "jsonwebtoken"
import userModel from "../models/User.js"

class middleware {
    static auth = async (req, res, next) => {
        let token;
        const { authorization } = req.headers

        if (authorization && authorization.startsWith('Bearer')) {
            try {
                token = authorization.split(' ')[1]

                //verify token
                const { userId } = jwt.verify(token, process.env.secreatKey)

                //get user from user
                req.user = await userModel.findById(userId).select(-password)
                next();
            } catch (error) {
                res.send({
                    "status": "failed",
                    "msg": "Unauthorised user"
                })
            }
        }
        if (!token) {
            res.send({
                "status": "failed",
                "msg": "no token"
            })
        }
    }
}

export default middleware