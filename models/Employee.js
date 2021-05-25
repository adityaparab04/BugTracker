const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

employeeSchema.plugin(AutoIncrement, {inc_field: 'employee_id'});

module.exports = mongoose.model('Employee', employeeSchema);
