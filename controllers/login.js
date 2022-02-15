const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    try {
        const { type, id, password } = req.body;

        if (type === 'admin') {
            const data = await Admin.find({admin_id: id});

            if(data.length > 0) {
                user = data[0];
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'authentication failed please check your credentials'
                });
            }
        } else if (type === 'employee') {
            const data = await Employee.find({employee_id: id});

            if(data.length > 0) {
                user = data[0];
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'authentication failed please check your credentials'
                });
            }
        } else if (type === 'client') {
            const data = await Client.find({client_id: id});

            if(data.length > 0) {
                user = data[0];
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'authentication failed please check your credentials'
                });
            }
        }

        const result = await bcrypt.compareSync(password, user.password);

        if(result) {
            const token = await jwt.sign({
                    username: user.username,
                    id,
                    type
                },
                process.env.JWT_KEY
            );

            res.status(200).json({
                success: true,
                message: 'authentication complete',
                type: type,
                id: id,
                username: user.username,
                token: token
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'authentication failed please check your credentials'
            });
        }

    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

