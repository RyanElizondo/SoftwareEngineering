const nodemailer = require("nodemailer")
const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;


module.exports.transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass,
    }, 
});

module.exports.mailOptions = {
    from: email,
    to: email,  //TODO change to email of customer
};
