var UserCtrl= require('../controllers/UserController');

// API Server Endpoints
module.exports = function(router)
{	
        router.post('/api/signup', UserCtrl.signup);
        router.post('/api/signupotpverification', UserCtrl.signUpOtpVerification);
        router.post('/api/login', UserCtrl.login);
        router.post('/api/forgotpassword', UserCtrl.forgotPassword);
        router.post('/api/forgototpverification', UserCtrl.forgotUpOtpVerification);
       // router.post('/api/resetpassword', UserCtrl.forgotResetPassword);
};
