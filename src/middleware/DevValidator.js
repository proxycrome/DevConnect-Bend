import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Dev } from '../model/DevModel.js'; 


//initialize env
dotenv.config()

const DevValidator = async (req, res, next) => {
    const bearerToken = req.header('Authorization');
    if(!bearerToken) {
        return res.status(401).json({status: "fail", message: "Unauthorized, Please Login as a Developer"})
    }
    try{
        const token = bearerToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Dev.findById(decoded.id);
        req.body.access = user.access;
        next();
        
    } catch(error) {
        res.status(500).json({status: 'fail', message: "server error", error})
    }
}

export default DevValidator;