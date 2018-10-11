var AccountTypeManagerInst = require('./models/AccountTypes.js');

var AccountType = {
    "At_Id": "At_Id3",
    "At_Type": "At_Type33"
};

function connectToDB() {
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/testdb');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function () {
        console.log("Connected to DB");
        //mongoose.connection.close();
    });
}

connectToDB();

AccountTypeManagerInst().createAccountType22(AccountType, function (res, err) {
    console.log("Result-->", JSON.stringify(res), "\nError -->", err);
});


/*

AccountTypeManagerInst().getAccountTypeById("At_Id1", function (res, err) {
    console.log("Result-->", JSON.stringify(res), "\nError -->", err);
});

AccountTypeManagerInst().getAccountTypes(function (res, err) {
    console.log("Result-->", JSON.stringify(res), "\nError -->", err);
});
*/
