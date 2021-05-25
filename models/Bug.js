const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const bugSchema = new mongoose.Schema({
    client_id: {
        type: Number,
        required: true
    },
    client_username: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    bug: {
        type: String,
        required: true
    },
    working_emp_id: {
        type: Number,
        default: 0
    },
    working_emp_name: {
        type: String,
        default: 'not assigned'
    },
    bug_status: {
        type: String,
        default: 'unassigned'
    },
    solution: {
        type: String,
        default: 'unsolved'
    }
});

bugSchema.plugin(AutoIncrement, {inc_field: 'bug_id'});

module.exports = mongoose.model('Bug', bugSchema);
