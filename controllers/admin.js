const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
const Client = require('../models/Client');
const Bug = require('../models/Bug');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});

        return res.status(200).json({
            success: true,
            data: admins
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err
        });
    }
}

exports.getAllBugs = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        data = decoded;

        if (data.type === 'admin') {
            const bugs = await Bug.find({});

            return res.status(200).json({
                success: true,
                data: bugs
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'unauthorized'
            });
        }
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err
        });
    }
}

exports.assignBug = async (req, res) => {
    try {
        const { bug_id, working_emp_id, working_emp_name} = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        data = decoded;

        if (data.type === 'admin') {
            const bug = await Bug.find({bug_id: bug_id});

            if (bug.length > 0) {
                if (bug[0].bug_status === 'unassigned') {

                    const filter = {bug_id: bug_id};
                    const update = {
                        working_emp_id: working_emp_id,
                        working_emp_name: working_emp_name,
                        bug_status: 'assigned'
                    };
    
                    const doc = await Bug.findOneAndUpdate(filter, update, { new: true});
    
                    return res.status(200).json({
                        success: true,
                        data: doc
                    });
    
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'already assigned the bug to one employee'
                    });
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'bug not found'
                });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: 'unauthorized'
            });
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

exports.unassignBug = async (req, res) => {
    try {
        const { bug_id } = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        data = decoded;

        if (data.type === 'admin') {
            const bug = await Bug.find({bug_id: bug_id});

            if(bug.length > 0) {
                if (bug[0].bug_status === 'assigned' || bug[0].bug_status === 'solution not working') {

                    const filter = {bug_id: bug_id};
                    const update = {
                        working_emp_id: 0,
                        working_emp_name: 'not assigned',
                        bug_status: 'unassigned'
                    };
    
                    const doc = await Bug.findOneAndUpdate(filter, update, { new: true});
    
                    return res.status(200).json({
                        success: true,
                        data: doc
                    });
    
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'this bug is already unassigned'
                    });
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'bug not found'
                });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: 'unauthorized'
            });
        }

    } catch(err) {
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

exports.deleteBug = async(req, res) => {
    try {
        const { bug_id } = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        data = decoded;

        if (data.type === 'admin') {
            const bug = await Bug.find({bug_id: bug_id});

            if(bug.length > 0) {
                await Bug.remove({bug_id: bug_id});

                return res.status(200).json({
                    success: true,
                    message: 'bug has been deleted successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'no bug found'
                });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: 'unauthorized'
            });
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

exports.adminRegister = async (req, res) => {
    try {
       const hash = await bcrypt.hash(req.body.password, 10);

       const new_user = await new Admin({
           username: req.body.username,
           password: hash
       });

       const result = await new_user.save();

       return res.status(201).json({
           success: true,
           type: 'admin',
           data: new_user
       });

    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.employeeRegister = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        const new_user = await new Employee({
            username: req.body.username,
            password: hash
        });

        const result = await new_user.save();

        return res.status(201).json({
            success: true,
            type: 'employee',
            data: new_user
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.clientRegister = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        const new_user = await new Client({
            username: req.body.username,
            password: hash
        });

        const result = await new_user.save();

        return res.status(201).json({
            success: true,
            type: 'client',
            data: new_user
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}
