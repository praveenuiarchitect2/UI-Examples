'use strict';
var mongoose = require('mongoose'), Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var response = {};
/**
 * @module User
 * @description  :  Signup,Login,logout,profile etc..
 */

var UserSchema = new Schema({

    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    middle_name: {type: String, required: false},
    mobile: {type: String, required: true},
    email: {type: String, required: true},
    user_otp: {type: String, required: true},
    user_secure_password: {type: String, required: true},
    device_os: {type: String, required: true},
    device_token: {type: String, required: true},
    created_date: {type: Date, default: Date.now},
    user_status: {
        type: String,
        enum: ['verification', 'active', 'inactive', 'forgotpassword'],
        default: 'verification'
    }
});


var User = module.exports = mongoose.model('User', UserSchema);
/** export schema */
module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.user_secure_password, salt, function (err, hash) {
            newUser.user_secure_password = hash;
            newUser.save(callback);
        });
    });
};

// Checking User existance or not code
module.exports.checkUserExistance = function (check_array, callback)
{

    //575 - db error || 200 : Record exist || 204 :  No records found
    module.exports.checkUserID(check_array, function (eE, eRes) {
        if (eE) {
            response = {code: '575', message: 'DB Error', description: eE};
        }
        if (eRes != null)
        {
            if (eRes._id != '' || eRes._id != null)
            {
                response = {code: '200', message: 'Success', description: 'User exists'};
            } else
            {
                response = {code: '204', message: 'Fail', description: 'No results found'};
            }
        } else
        {
            response = {code: '204', message: 'Fail', description: 'No results found'};
        }
        callback(response);
    });

};
//Checking User ID  Based on single column condition
module.exports.checkUserID = function (conditions, callback) {
    var c_column = conditions['column'];
    var inputdata = conditions['inputdata'];
    var query = {};
    query[c_column] = inputdata;
    var cols = {'_id': 1, 'first_name': 1, 'user_status': 1, 'created_date': 1};
    User.findOne(query, cols, callback);
};

//Checking User Valid or not 
module.exports.checkActiveUser = function (conditions, callback) {
    var c_column = conditions['column'];
    var inputdata = conditions['inputdata'];
    var query = {};
    query[c_column] = inputdata;
    query['user_status'] = 'active';
    var cols = {'_id': 1, 'first_name': 1, 'user_status': 1, 'created_date': 1};
    User.findOne(query, cols, callback);
};

module.exports.checkUserMobile = function (mobile, callback) {

    //575 - db error || 200 : Record exist || 204 :  No records found
    var mobileArray = new Array();
    mobileArray['column'] = 'mobile';
    mobileArray['inputdata'] = mobile;
    module.exports.checkActiveUser(mobileArray, function (eE, eRes) {
        if (eE) {
            response = {code: '575', message: 'DB Error', description: eE};
        }
        if (eRes != null)
        {
            if (eRes._id != '' || eRes._id != null)
            {
                response = {code: '200', message: 'Success', description: 'User exists'};
            } else
            {
                response = {code: '204', message: 'Fail', description: 'No results found'};
            }
        } else
        {
            response = {code: '204', message: 'Fail', description: 'Account not verified or no account details found'};
        }
        callback(response);
    });

};


// Verify The signup OTP
module.exports.signupOtpVerification = function (otpcode, callback) {

    module.exports.otpMatch(otpcode, function (eE, eRes) {
        if (eE) {
            response = {code: '575', message: 'DB Error', description: eE};
        }
        if (eRes != null)
        {
            if (eRes._id != '' || eRes._id != null)
            {
                var resUserStatus = eRes.user_status;

                if (resUserStatus == 'verification')
                {
                    //response = {code : '200', message : 'Success' , description :'Your verification completed successfully.Please login to conitnue.'};
                    User.updateOne(
                            {user_otp: otpcode},
                            {
                                $set: {user_otp: '', user_status: 'active'}
                            }
                    , function (err, otpRes) {
                        if (err) {
                            response = {code: '575', message: 'DB Error', description: err};
                        }
                        if (otpRes != null)
                        {

                            response = {code: '200', message: 'Success', description: 'Your verification completed successfully.Please login to continue.'};

                        } else
                        {
                            response = {code: '204', message: 'Fail', description: 'Some thing went wrong'};
                        }
                        //callback(response);
                    });
                } else if (resUserStatus == 'active')
                {
                    response = {code: '204', message: 'Fail', description: 'Your account already verified.Please login to continue.'};
                } else if (resUserStatus == 'inactive')
                {
                    response = {code: '204', message: 'Fail', description: 'Your account is blocked. Please contact admin for more details'};
                }

                if (resUserStatus == 'verification')
                {
                    response = {code: '200', message: 'Success', description: 'Your verification completed successfully.Please login to conitnue.'};
                }
            } else
            {
                response = {code: '204', message: 'Fail', description: 'Invalid OTP'};
            }
        } else
        {
            response = {code: '204', message: 'Fail', description: 'Invalid OTP'};
        }
        // console.log(response);
        callback(response);
    });
};

module.exports.otpMatch = function (otpcode, callback) {
    var query = {};
    query['user_otp'] = otpcode;
    var cols = {'_id': 1, 'first_name': 1, 'user_status': 1, 'created_date': 1};
    User.findOne(query, cols, callback);
};

module.exports.userLoginAuth = function (logParams, callback)
{ 
    var mobile = logParams.mobile;
    var password = logParams.password;
    User.findOne({
        mobile: mobile,
        user_status: 'forgotpassword',
    },{}, function (err, userRes) {
        if (err)
            response = {code: '575', message: 'Fail', description: 'DB Error ' + err};
        if (!userRes) {

            response = {code: '204', message: 'Authentication fail', description: 'Invalid credentials'};
            callback(response);
            return;
        } else
        {
            User.comparePassword(password, userRes.user_secure_password, function (err, isMatch)
            {
                if (err) {
                    response = {code: '575', message: 'Fail', description: 'DB Error ' + err};
                    callback(response);
                    return;
                }
                if (isMatch) {
                    console.log('Logged in success');
                    response = {code: '200', message: 'Success', description: 'Your logged in success. Please wait redirecting..!', autheniticationkey: "12131212"};
                    callback(response);
                    return;
                } else {
                    console.log('Logged in Fail');
                    response = {code: '204', message: 'Authentication fail', description: 'Invalid credentials'};
                    callback(response);
                    return;

                }
            });
        }
        callback(response);
        return;
    });


};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err)
            throw err;
        callback(null, isMatch);
    });
}
/* >> Login module code end */

// Forgot password - OTP sending
module.exports.sendForgotOTP = function (mobile, callback) {
    var userOtp = Math.floor(100000 + Math.random() * 900000);
    User.updateOne(
            {mobile: mobile},
            {
                $set: {user_otp: userOtp, user_status: 'forgotpassword'}
            }
    , function (err, eRes) {
        if (err) {
            response = {code: '575', message: 'DB Error', description: err};
        }
        if (eRes != null)
        {
            if (eRes.ok != '' || eRes.ok != null)
            {
                response = {code: '200', message: 'Success', description: 'OTP has been sened.Please verify to continue.', otpcode: userOtp};
            } else
            {
                response = {code: '204', message: 'Fail', description: 'Some thing error occured'};
            }
        } else
        {
            response = {code: '204', message: 'Fail', description: 'Some thing went wrong'};
        }
        callback(response);
    });
};

// Forgot password OTP verification
module.exports.forgotOtpVerification = function (otpcode, callback) {

    module.exports.otpMatch(otpcode, function (eE, eRes) {
        if (eE) {
            response = {code: '575', message: 'DB Error', description: eE};
        }
        if (eRes != null)
        {
            if (eRes._id != '' || eRes._id != null)
            {
                var resUserStatus = eRes.user_status;

                if (resUserStatus === 'forgotpassword')
                {
                    response = {code: '200', message: 'Success', description: 'Your OTP has been verified successfully.Please reset your password'};
                } else if (resUserStatus === 'active')
                {
                    response = {code: '204', message: 'Fail', description: 'Your account already verified.Please login to continue.'};
                } else if (resUserStatus === 'inactive')
                {
                    response = {code: '204', message: 'Fail', description: 'Your account is blocked. Please contact admin for more details'};
                } else if (resUserStatus === 'verification')
                {
                    response = {code: '204', message: 'Fail', description: 'Please account is in verification mode.'};
                }

            } else
            {
                response = {code: '204', message: 'Fail', description: 'Invalid OTP'};
            }
        } else
        {
            response = {code: '204', message: 'Fail', description: 'Invalid OTP'};
        }
        // console.log(response);
        callback(response);
    });
};


module.exports.forgotResetPassword = function (otpcode, callback) {

    module.exports.otpMatch(otpcode, function (eE, eRes) {
        if (eE) {
            response = {code: '575', message: 'DB Error', description: eE};
        }
        if (eRes != null)
        {
            if (eRes._id != '' || eRes._id != null)
            {
                var resUserStatus = eRes.user_status;
                if (resUserStatus === 'forgotpassword')
                {
                    response = {code: '200', message: 'Success', description: 'Your OTP has been verified successfully.Please reset your password'};
                } 
                else if (resUserStatus === 'active')
                {
                    response = {code: '204', message: 'Fail', description: 'Your account already verified.Please login to continue.'};
                } 
                else if (resUserStatus === 'inactive')
                {
                    response = {code: '204', message: 'Fail', description: 'Your account is blocked. Please contact admin for more details'};
                } 
                else if (resUserStatus === 'verification')
                {
                    response = {code: '204', message: 'Fail', description: 'Please account is in verification mode.'};
                }
            } 
            else
            {
                response = {code: '204', message: 'Fail', description: 'Invalid OTP'};
            }
        } 
        else
        {
            response = {code: '204', message: 'Fail', description: 'Invalid OTP'};
        }
        // console.log(response);
        callback(response);
    });
};
