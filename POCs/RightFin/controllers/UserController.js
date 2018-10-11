'use strict';
var UserObj = require('../models/UserModel');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var response = {};
var validationObj = require('../validators/Validations');
/* 
 * => => => => Signup module start
 */
exports.signup = function (req, res) {

    //Validation code start 
    var first_name = req.body.firstname;
    var last_name = req.body.lastname;
    var middle_name = req.body.middlename;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var password = req.body.password;
    var device_token = req.body.device_token;
    var device_os = req.body.device_os;

    var error_msg = '';
    var error_status = 0; // 0 : No errors
    if (first_name == '') {
        error_msg += 'First name, ';
        error_status = 1;
    }
    if (last_name == '') {
        error_msg += 'Last name, ';
        error_status = 1;
    }
    if (email == '') {
        error_msg += 'Email, ';
        error_status = 1;
    }
    if (mobile == '') {
        error_msg += 'Mobile, ';
        error_status = 1;
    }
    if (password == '') {
        error_msg += 'password, ';
        error_status = 1;
    }
    if (device_token == '') {
        error_msg += 'Token, ';
        error_status = 1;
    }
    if (device_os == '') {
        error_msg += 'OS , ';
        error_status = 1;
    }
    if (error_status == 1)
    {
        response = {code: '301', message: 'Validation error', description: error_msg + ' required'};
        res.json(response);
    } else
    {
        var user_otp = Math.floor(100000 + Math.random() * 900000);
        var User = require('../models/UserModel');
        var newUser = new User({
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            mobile: mobile,
            email: email,
            user_otp: user_otp,
            user_secure_password: password,
            device_os: device_os,
            device_token: device_token,
        });
        var email_checkArray = new Array();
        email_checkArray['column'] = 'email';
        email_checkArray['inputdata'] = email;
        var mobile_checkArray = new Array();
        mobile_checkArray['column'] = 'mobile';
        mobile_checkArray['inputdata'] = mobile;
        UserObj.checkUserExistance(mobile_checkArray, function (checkResponse) {
            if (checkResponse.code == 200)
            {
                response = {code: '204', message: 'Already exists', description: 'With this ' + mobile + ' already account exists'};
                res.json(response);
            } else
            {
                //Checking Duplication of email
                UserObj.checkUserExistance(email_checkArray, function (emailResponse)
                {
                    if (emailResponse.code == 200)
                    {
                        response = {code: '204', message: 'Already exists', description: 'With this ' + email + ' already account exists'};
                        res.json(response);
                    } else
                    {
                        //Inserting the user module code 
                        UserObj.createUser(newUser, function (err, UserRes) {
                            if (err) {
                                response = {code: '204', message: 'Internal server', description: err};
                                res.json(response);
                            }
                        });
                        response = {code: '200', message: 'success', description: 'Account created successfully. Please verify the OTP to continue', otpcode: user_otp};
                        res.json(response);
                    }

                });

            }
        });

    }

};

/* 
 *  Signup module end <= <= <= <=
 */
/* 
 * => => => => Forgot password module start
 */
exports.forgotPassword = function (req, res) {

    var errorMsg = '';
    var errorStatus = 0; // 0 : No errors
    var mobile = req.body.mobile;
    if (mobile == '') {
        errorMsg += 'Please enter valid 10 digit mobile number';
        errorStatus = 1;
    }

    if (errorStatus == 1) {
        response = {code: '301', message: 'Validation', description: errorMsg}
        res.json(response);
    } else
    {
        UserObj.checkUserMobile(mobile, function (checkResponse)
        {
            if (checkResponse.code != 200)
            {
                res.json(checkResponse);
            } else
            {
                // Sending OTP Code start 
                UserObj.sendForgotOTP(mobile, function (otpres) {
                    res.json(otpres);
                });

            }
        });
    }


};

/* 
 *  Forgot password module  end <= <= <= <=
 */

/* 
 * => => => => Verify the signup OTP Code
 */
exports.signUpOtpVerification = function (req, res) {

    var errorMsg = '';
    var errorStatus = 0; // 0 : No errors
    var otp = req.body.otp;
    if (otp == '') {
        errorMsg += 'Please enter  6 digit OTP';
        errorStatus = 1;
    }
    if (errorStatus == 1)
    {
        response = {code: '301', message: 'Validation', description: errorMsg};
        res.json(response);
    } else
    {
        UserObj.signupOtpVerification(otp, function (modelResponse)
        {
            res.json(modelResponse);

        });
    }


};
/* 
 * Verify the signup OTP Code end <= <= <= <=
 */

exports.login = function (req, res)
{
    var mobile = req.body.mobile;
    var password = req.body.password;
    var errorMsg = '';
    var errorStatus = 0; // 0 : No errors
    if (mobile == '') {
        errorMsg += 'Enter 10 digit mobile number, ';
        errorStatus = 1;
    }
    if (password == '') {
        errorMsg += 'Enter password with min 6 letters ';
        errorStatus = 1;
    }
    if (errorStatus == 1)
    {
        response = {code: '301', message: 'Validation', description: errorMsg};
        res.json(response);
    } else
    {
        //Login section proceeding here
        var loginDetailsObj = {};
        loginDetailsObj.mobile = mobile;
        loginDetailsObj.password = password;
        UserObj.userLoginAuth(loginDetailsObj, function (modelResponse)
        {
           // console.log(modelResponse);
            res.json(modelResponse);

        });
    }


};

/* 
 * => => => => Verify the Forgot OTP Code
 */
exports.forgotUpOtpVerification = function (req, res) {

    var errorMsg = '';
    var errorStatus = 0; // 0 : No errors
    var otp = req.body.otp;
    if (otp == '') {
        errorMsg += 'Please enter  6 digit OTP';
        errorStatus = 1;
    }
    if (errorStatus == 1)
    {
        response = {code: '301', message: 'Validation', description: errorMsg};
        res.json(response);
    } else
    {
        UserObj.forgotOtpVerification(otp, function (modelResponse)
        {
            res.json(modelResponse);

        });
    }


};
/* 
 * Verify the Forgot OTP Code end <= <= <= <=
 */