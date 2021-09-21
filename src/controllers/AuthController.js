import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Dev } from '../model/DevModel.js';
import { Employer } from '../model/EmployerModel.js'


dotenv.config();

const AuthController = {
    devSignUp: async (req, res) => {
        try {
        
            const { firstName, lastName, email, password, github, gender , linkedIn, role} = req.body; 

            if( !firstName || !lastName || !email || !password || !github || !gender) {
                return res.status(400).json({status: 'fail', message: "Please fill all fields"})
            }

            // Check if the email already exists

            const emailExists = await Dev.findOne({email})

            if(emailExists) {
                return res.status(400).json({status: 'fail', message: "User already exist"});
            }
            
            //password hash 
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            if(hashedPassword){
                const newUser = new Dev({ firstName, lastName, email, password: hashedPassword, github, gender, linkedIn, role })
                const savedUser = await newUser.save();
            
                if(savedUser) {
                    jwt.sign({id:savedUser._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                        if(err) {
                            throw err;
                        }
                        res.status(200).json({status: "success", data: {
                            token: 'Bearer ' + token,
                            id: savedUser._id,
                            firstName: savedUser.firstName,
                            lastName: savedUser.lastName,
                            email: savedUser.email,
                            github: savedUser.github,
                            gender: savedUser.gender,
                            linkedIn: savedUser.linkedIn,
                            role: savedUser.role
                        }, message: "successful"});
                    }); 
                }   
            }
        } catch(error){
            res.status(500).json({status: "fail", message: "server err", error});
        }
    },

    devLogin:  async(req, res) => {
        try {
            const {email, password} = req.body;

            if(!email || !password) {
                return res.status(400).json({status: 'fail', message: "Provide email and password"});
            }

        const isUser = await Dev.findOne({email});

            if(!isUser) {
                res.status(404).json({status: 'fail', message: "record not found"})
            }

            // validate user password
            const match = await bcrypt.compare(password, isUser.password);
            
            if(!match) {
                return res.status(400).json({status: 'fail', message: "email or password is incorrect"});
            }
            
            jwt.sign({id: isUser._id}, process.env.JWT_SECRET,{expiresIn: 3600}, (err, token) => {        
                if(err) {
                    throw err;
                }
               
                return res.status(200).json({status: "success", data: {
                    token: "Bearer " + token,
                    id: isUser._id,
                    firstName: isUser.firstName,
                    lastName: isUser.lastName,
                    email: isUser.email,
                    github: isUser.github,
                    gender: isUser.gender,
                    linkedIn: isUser.linkedIn,
                    role: isUser.role
                }, message: "successful"});
            });
        } catch (err) {
            res.status(500).json({status: 'failed', message: "Server Error", err})
        }
    },

    empSignup: async(req, res) => {
        try {
        
            const { companyName, email, password, linkedIn, website } = req.body; 

            if( !companyName || !email || !password || !linkedIn || !website) {
                return res.status(400).json({status: 'fail', message: "Please fill all fields"})
            }

            // Check if the email already exists
            const emailExists = await Employer.findOne({email})

            if(emailExists) {
                return res.status(400).json({status: 'fail', message: "User already exist"});
            }
            
            //password hash 
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            if(hashedPassword){
                const newEmployer = new Employer({ companyName, email, password: hashedPassword, linkedIn, website})
                const savedEmployer = await newEmployer.save();
            
                if(savedEmployer) {
                    jwt.sign({id:savedEmployer._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                        if(err) {
                            throw err;
                        }
                        res.status(200).json({status: "success", data: {
                            token: 'Bearer ' + token,
                            id: savedEmployer._id,
                            companyName: savedEmployer.companyName,
                            email: savedEmployer.email,
                            linkedIn: savedEmployer.linkedIn,
                            website: savedEmployer.website
                        }, message: "successful"});
                    }); 
                }   
            }
        } catch(error){
            res.status(500).json({status: "fail", message: "server err", error});
        }
    },

    empLogin:  async(req, res) => {
        try {
            const {email, password} = req.body;

            if(!email || !password) {
                return res.status(400).json({status: 'fail', message: "Provide email and password"});
            }

        const isEmployer = await Employer.findOne({email});

            if(!isEmployer) {
                res.status(404).json({status: 'fail', message: "record not found"})
            }

            // validate user password

            const match = await bcrypt.compare(password, isEmployer.password);
            
            if(!match) {
                return res.status(400).json({status: 'fail', message: "email or password is incorrect"});
            }
            
            jwt.sign({id: isEmployer._id}, process.env.JWT_SECRET,{expiresIn: 86400}, (err, token) => {
                    
                if(err) {
                throw err;
                }
        
                return res.status(200).json({status: "success", data: {
                    token: "Bearer " + token,
                    id: isEmployer._id,
                    companyName: isEmployer.companyName,
                    email: isEmployer.email,
                    linkedIn: isEmployer.linkedIn,
                    website: isEmployer.website
                }, message: "successful"});
            });
        } catch (err) {
            res.status(500).json({status: 'failed', message: "Server Error", err})
        }
    },

}

export default AuthController;