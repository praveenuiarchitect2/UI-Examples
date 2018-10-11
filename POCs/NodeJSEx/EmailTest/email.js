
function sendEmailSeSWithNodeMailerOld() {

	var nodemailer = require('nodemailer');

	var SMTPUserName = "test.gprec@gmail.com";
        var SMTPUserPassword = "";
        var SMTPHost = "smtp.gmail.com";
        var SMTPPort = 587;
        var SMTPsender = "test.gprec@gmail.com";


	 nodemailer.SMTP = {
		host: SMTPHost,
		port: SMTPPort,
		//secure : false,
		//ssl: false,
		//ignoreTLS: true,
		use_authentication: true,
		auth: {
		    user: SMTPUserName,
		    pass: SMTPUserPassword
		}
	    };

	var mailOptions = {
		from: '"test K" <test.gprec@gmail.com>',
		to: 'test@test.com',
		subject: 'greetings.....',
		html: ' Test Email...'
	    };

	nodemailer.sendMail(mailOptions, function(error, info){
	   	if(error)
	 		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ err while sending email", error);
		else 
	 		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ sent email succesfully");
	});

}


function sendWithoutAuth() {

	var nodemailer = require('nodemailer');

	var SMTPUserName = "";
        var SMTPUserPassword = "";
        var SMTPHost = "smtp.gmail.com";
        var SMTPPort = 587;
        var SMTPsender = "test.gprec@gmail.com";


	 nodemailer.SMTP = {
		host: SMTPHost,
		port: SMTPPort,
		//secure : false,
		//ssl: false,
		//ignoreTLS: true,
		use_authentication: true,
		auth: {
		    user: SMTPUserName,
		    pass: SMTPUserPassword
		}
	    };

	var mailOptions = {
		from: '"test" <test.gprec@gmail.com>',
		to: 'test@test.com',
		subject: 'greetings.....',
		html: ' Test Email...'
	    };

	nodemailer.sendMail(mailOptions, function(error, info){
	   	if(error)
	 		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ err while sending email", error);
		else 
	 		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ sent email succesfully");
	});

}

sendEmailSeSWithNodeMailerOld();
//sendWithoutAuth();


