const Client = require('../models/Client');
const Bug = require('../models/Bug');

const jwt = require('jsonwebtoken');

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find({});

        return res.status(200).json({
            success: true,
            data: clients
        })
    } catch(err) {
        return res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.reportBug = async (req, res) => {
    try {
        const {client_id, client_username, project, bug} = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        data = decoded;

        if (data.type === 'client') {
            const new_bug = await new Bug({
                client_id,
                client_username,
                project,
                bug
            });
    
            const result = await new_bug.save();
    
            return res.status(200).json({
                success: true,
                data: new_bug
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'unauthorized only client can create bugs'
            });
        }
    } catch(err) {
        return res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.confirmsolution = async(req, res) => {
    try {
        const  {bug_id} = req.body;
        const bug = await Bug.find({bug_id: bug_id});
        name = bug[0].working_emp_name

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        data = decoded;

        if(data.type === 'client') {
            if(bug.length > 0) {
                const filter = {bug_id: bug_id};
                const update = {
                    working_emp_id: 0,
                    working_emp_name: `solved by ${name}`,
                    bug_status: 'solved',
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
            status: false,
            error: err
        })
    }
}

exports.denysoluton = async(req, res) => {
    try {
        const  {bug_id} = req.body;
        const bug = await Bug.find({bug_id: bug_id});

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        data = decoded;

        if(data.type === 'client') {
            if(bug.length > 0) {
                const filter = {bug_id: bug_id};
                const update = {
                    bug_status: 'solution not working',
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
            status: false,
            error: err
        })
    }
}

exports.deleteBug = async (req, res) => {
    try {
        const {bug_id} = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        data = decoded;

        const bug = await Bug.find({bug_id: bug_id});

        if(data.type === 'client') {
            if (bug.length > 0) {
                if (data.id === bug[0].client_id) {
                    await Bug.remove({bug_id: bug_id});
        
                    return res.status(200).json({
                        success: true,
                        message: 'bug has been deleted successfully'
                    });
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'you do not have authority to delete this bug'
                    });
                }
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
        })
    }
}

exports.getBugStatus = async (req, res) => {
    try {
        const {id} = req.params

        const bug = await Bug.find({client_id: id});

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
