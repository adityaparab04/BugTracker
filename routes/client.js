const express = require('express');
const router = express.Router();

const check_auth = require('../middleware/check_auth');
const { getClients, reportBug, getBugStatus, deleteBug, confirmsolution, denysoluton } = require('../controllers/client');

router
    .route('/')
    .get(getClients);

router
    .route('/report_bug')
    .post(check_auth, reportBug);

router
    .route('/delete_bug')
    .post(check_auth, deleteBug);

router
    .route('/bugs/:id')
    .get(check_auth, getBugStatus);

router
    .route('/confirmsolution')
    .post(check_auth, confirmsolution);

router
    .route('/notworking')
    .post(check_auth, denysoluton);

module.exports = router;