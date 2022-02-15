const express = require('express');
const router = express.Router();

const check_auth = require('../middleware/check_auth');

const { getAdmins, adminRegister, employeeRegister, clientRegister, getAllBugs, assignBug, unassignBug, deleteBug } = require('../controllers/admin');

router
    .route('/')
    .get(getAdmins);

router
    .route('/bugs')
    .get(check_auth, getAllBugs);

router
    .route('/assignbug')
    .post(check_auth, assignBug);

router
    .route('/deletebug')
    .post(check_auth, deleteBug)

router
    .route('/unassignbug')
    .post(check_auth, unassignBug);

router
    .route('/register')
    .post(adminRegister);

router
    .route('/employeeRegister')
    .post(employeeRegister);

router
    .route('/clientRegister')
    .post(clientRegister);

module.exports = router;