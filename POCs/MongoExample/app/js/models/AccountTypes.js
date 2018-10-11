var inherits = require('util').inherits;
var AccountTypesSchema = require('./../dbmodels/AccountTypesSchema.js');
var BaseModel = require('./BaseModel');

function AccountTypes() {
    BaseModel.call(this);
}

inherits(AccountTypes, BaseModel);


AccountTypes.prototype.createAccountType22 = function (accountType, cb) {

    var accountTypes = new AccountTypesSchema(accountType);
    accountTypes.save(function (err) {
        if (err) {
            cb(null, err);
            return;
        }
        cb(accountTypes, null);
    });

};


AccountTypes.prototype.createAccountType = function (accountType, cb) {

    var accountTypes = new AccountTypesSchema(accountType);

    var mongoose = require('mongoose');

    mongoose.connect(this.dbHost);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected to DB");
        accountTypes.save(function (err) {
            if (err) {
                cb(null, err);
                return;
            }
            cb(accountTypes, null);
            mongoose.connection.close();
        });
    });
};

AccountTypes.prototype.getAccountTypeById = function (accountTypeId, cb) {

    var mongoose = require('mongoose');
    mongoose.connect(this.dbHost);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected to DB");
        var query = {
            At_Id : accountTypeId
        };
        AccountTypesSchema.find(query, function (err, accountType) {
            if (err) {
                cb(null, err);
                return;
            }
            cb(accountType, null);
            mongoose.connection.close();
        });
    });
};


AccountTypes.prototype.getAccountTypes = function (cb) {

    var mongoose = require('mongoose');
    mongoose.connect(this.dbHost);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected to DB");
        AccountTypesSchema.find({}, function (err, accountType) {
            if (err) {
                cb(null, err);
                return;
            }
            cb(accountType, null);
            mongoose.connection.close();
        });
    });
};

module.exports = function () {
    return new AccountTypes();
};