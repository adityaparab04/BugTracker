const Employee = require('../models/Employee');
const Bug = require('../models/Bug');

const jwt = require('jsonwebtoken');

exports.getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find({});

        return res.status(200).json({
            success: true,
            data: employees
        })
    } catch(err) {
        return res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.getAssignedBug = async(req, res) => {
    try {
        const {id} = req.params

        const bug = await Bug.find({ working_emp_id: id});

        return res.status(200).json({
            success: true,
            data: bug
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err
        });
    }
}

exports.giveSolution = async(req, res) => {
    try {
        const { bug_id, solution } = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        data = decoded;

        if(data.type === 'employee') {
            const bug = await Bug.find({bug_id: bug_id});

            if(bug.length > 0) {
                const filter = {bug_id: bug_id};
                const update = {
                    solution: solution,
                    bug_status: 'solution is given'
                };

                const doc = await Bug.findOneAndUpdate(filter, update, { new: true});
    
                return res.status(200).json({
                    success: true,
                    data: doc
                });

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
        return res.status(500).json({
            success: false,
            error: err
        });
    }
}
