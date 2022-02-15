const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const clientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

clientSchema.plugin(AutoIncrement, {inc_field: 'client_id'});

module.exports = mongoose.model('Client', clientSchema);
