const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.plugin(AutoIncrement, {inc_field: 'admin_id'});

module.exports = mongoose.model('Admin', adminSchema);
