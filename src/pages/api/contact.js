import { selectOrderTotal } from '../../features/order/orderSlice';
import { mailOptions, transporter } from '../../lib/nodemailer';

const handler = async (req, res) => {
if(req.method === "POST"){
        try{
            await transporter.sendMail({
                ...mailOptions,
                subject: "Thank you for your purchase",
                text: selectOrderTotal,
                html:"<h1>Recept</h1>"
            })
            return res.status(200).json({success: true});
        }
        catch(error){
            console.log(error);
        }
    }
}
export default handler;