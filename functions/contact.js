const{ mailOptions, transporter } = require ('./nodemailer');

const handler = async (event, context) => {
if(event.httpMethod === "POST"){
        const data = event.body;
        try{
            await transporter.sendMail({
                ...mailOptions,
                subject: "Thank you for your purchase",
                text: data.amount,
                html:"<h1>Recept</h1>"
            })
            return res.status(200).json({success: true});
        }
        catch(error){
            console.log(error);
        }
    }
}
module.exports.handler;