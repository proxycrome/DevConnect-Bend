import { Dev } from "../model/DevModel.js";
import { Employer } from '../model/EmployerModel.js';
import { Job } from '../model/JobModel.js';
import { DevApply } from "../model/applyModel.js";

const UserController = {
    getDevs: async (req, res) => {
        try{
            const devs = await Dev.find({}).lean().exec();
            return res
                .status(201)
                .json({
                    status: 'success', 
                    message: 'successful', 
                    data: devs,
                })
        }catch(err){
            return res.status(500).json({status: 'fail', message: 'server error', err})
        }
    },

    getDevById: async (req, res) => {
        const {userId} = req.params;
        try{
            const dev = await Dev.findById(userId).lean().exec();
            return res
                .status(201)
                .json({
                    status: 'success', 
                    message: 'successful', 
                    data: dev,
                })
        }catch(err){
            return res.status(500).json({status: 'fail', message: 'server error', err})
        }
    },

    editDev: async (req, res) => {
        const { firstName, lastName, email, github, linkedIn, role, bio } = req.body;
        const { userId } = req.params;

        try{
            const newInputs = await Dev.findByIdAndUpdate(userId, { firstName, lastName, email, github, bio, role, linkedIn }, {new: true});
            const inputs = await newInputs.save();
            if(!inputs) {
                return res.status(400).json({status: 'fail', message: 'something went wrong'});
            }
            return res.status(201).json({status: 'success', message: 'successful', data: inputs});

        }catch(err){
            return res.status(500).json({status: 'fail', message: 'server error', err});
        }
    },

    getEmployers: async (req, res) => {
        try {
            const employers = await Employer.find({}).lean().exec();
            return res
                .status(201)
                .json({
                    status: 'success',
                    message: 'successful',
                    data: employers,
                })
        } catch (err) {
            return res.status(500).json({status: 'fail', message: 'server error', err});            
        }
    },

    getEmployerById:  async (req, res) => {
        const { employerId } = req.params;
        try {
            const employer = await Employer.findById(employerId).lean().exec();
            return res
                .status(201)
                .json({
                    status: 'success',
                    message: 'successful',
                    data: employer,
                })
        } catch (err) {
            return res.status(500).json({status: 'fail', message: 'server error', err});            
        }
    },

    editEmployer: async (req, res) => {
        const { companyName, email, linkedIn, website } = req.body;
        const {employerId} = req.params;
        try {
            const newInputs = await Employer.findByIdAndUpdate(employerId, { companyName, email, linkedIn, website }, {new: true});
            const inputs = await newInputs.save();
            if(!inputs) {
                return res.status(400).json({status: 'fail', message: 'something went wrong'});
            }
            return res.status(201).json({status: 'success', message: 'successful', data: inputs});
        } catch (err) {
            
        }
    },

    addJobs: async (req, res) => {
        try {
            const { job_title, job_type, job_desc, closing_date, salary, access, companyName } = req.body;

            if(!access || access !== 'employer') {
                return res.status(401).json({status: 'fail', message: 'unauthorized'});
            }

            if(!job_title || !job_type || !job_desc){
                return res.status(400).json({status: 'fail', message: "Please fill all fields"})
            }

            const newJob = new Job({ job_title, job_type, job_desc, closing_date, salary, companyName });
            const savedJob = await newJob.save();

            if(savedJob){
                res.status(200).json({status: "success", data: {
                    id: savedJob._id,
                    job_title: savedJob.job_title,
                    job_type: savedJob.job_type,
                    job_desc: savedJob.job_desc,
                    closing_date: savedJob.closing_date,
                    salary: savedJob.salary,
                    companyName: savedJob.companyName
                }, message: "successful"});
            }
        } catch (error) {
            res.status(500).json({status: "fail", message: "server err", error});
        }
    },

    getJobs: async (req, res) => {
        try{
            const jobs = await Job.find({}).lean().exec();
            return res
                .status(201)
                .json({
                    status: 'success', 
                    message: 'successful', 
                    data: jobs,
                })
        }catch(err){
            return res.status(500).json({status: 'fail', message: 'server error', err})
        }
    },

    getJobById: async (req, res) => {
        const { jobId } = req.params;
        try {
            const job = await Job.findById(jobId).lean().exec();
            return res
                .status(201)
                .json({
                    status: 'success',
                    message: 'successful',
                    data: job,
                })
        } catch (err) {
            return res.status(500).json({status: 'fail', message: 'server error', err});            
        }
    },

    applyJob: async (req, res) => {
        try {
            const { name, email, phone, city, resume, access } = req.body;

            if(!access || access !== 'dev') {
                return res.status(401).json({status: 'fail', message: 'Unauthorized, Please Signin as a Developer'});
            }

            if(!name || !email || !phone){
                return res.status(400).json({status: 'fail', message: "Please fill all fields"})
            }

            const newApply = new DevApply({ name, email, phone, city, resume });
            const savedApp = await newApply.save();

            if(savedApp){
                res.status(200).json({status: "success", data: {
                    id: savedApp._id,
                    name: savedApp.name,
                    email: savedApp.email,
                    phone: savedApp.phone,
                    city: savedApp.city,
                    resume: savedApp.resume
                }, message: "successful"});
            }
        } catch (error) {
            res.status(500).json({status: "fail", message: "server err", error});
        }
    },
}

export default UserController;