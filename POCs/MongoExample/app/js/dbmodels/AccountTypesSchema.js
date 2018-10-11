var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountTypesSchema = Schema(
    {
        At_Id: {
            type: String,
            required: true
        },
        At_Code: Number,
        At_Type: {
            type: String,
            required: true,
            max: 15
        },
        At_Is_Active: {type: Boolean},
        At_Created_By: {type: String},
        At_Created_Date: Date
    }
);

//Export model
module.exports = mongoose.model('Account_Type', AccountTypesSchema);