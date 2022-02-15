const express = require('express');
const router = express.Router();

const check_auth = require('../middleware/check_auth');
const { getEmployee, getAssignedBug, giveSolution } = require('../controllers/employees');

router
    .route('/')
    .get(getEmployee);

router
    .route('/getassignedbug/:id')
    .get(check_auth, getAssignedBug);

router
    .route('/givesolution')
    .post(check_auth, giveSolution);

module.exports = router;