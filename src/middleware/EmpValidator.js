import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Employer } from '../model/EmployerModel.js'


//initialize env
dotenv.config()

const EmpValidator = async (req, res, next) => {
    const bearerToken = req.header('Authorization');
    if(!bearerToken) {
        return res.status(401).json({status: "fail", message: "Unauthorized"})
    }
    try{
        const token = bearerToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Employer.findById(decoded.id);
        req.body.access = user.access;
        next();
        
    } catch(error) {
        res.status(500).json({status: 'fail', message: "server error", error})
    }
}

export default EmpValidator;