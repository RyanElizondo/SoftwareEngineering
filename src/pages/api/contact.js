import { mailOptions, transporter } from "functions/nodemailer";




const handler = async (req, res) => {
if(req.method === "POST"){
        const data = req.body;
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
            return res.status(400).json({message: "Bad Request"});
        }
    }
return res.status(400).json ({message: "Bad Request"});
}
export default handler;