//Database functions for foodprepOrders API
const { getPaidOrders, updateOrderStatus} = require('./mongoNETLIFY')
const { openMongoConnection } = require('./mongoNETLIFY');  //mongoCRUD.js
const Ably = require('ably');
const ably = new Ably.Realtime(process.env.ABLY_API_KEY); //create ably instance
const channel = ably.channels.get('foodprep-orders'); //get foodprep-orders channel

channel.subscribe('foodprep-orders', (message) => { //subscribe to Received event
    console.log(`Received message: ${message.data}`);
});

openMongoConnection();

exports.handler = async (event, context) => { //handler function
    
    let status = 200;
    let bodyMessage;
    
    switch(event.httpMethod){
        case 'GET':{ //get all PAID orders
            const paidOrdersString = await getPaidOrders();
            
            bodyMessage = paidOrdersString;
            break;
        }    
        case 'PUT':{ //update order status
            /*
            const orderObject = { //get order from body
                _id: event.path.split('/')[2],
                status: 1,
                localeDate: new Date().toLocaleString(),
                firstname: "test",
                array: ["test", "test2"]
            }
            */

            const orderObject = JSON.parse(event.body);
            
            updateOrderStatus(orderObject.data.object._id, orderObject.data.object.status); //update order status

            const dataForFrontend = { //data to send to frontend
                action: 'addOrder',
                orderID: orderObject._id
            }

            channel.publish('foodprep-orders', dataForFrontend, function (err) { //publish to ably
                if (err) {
                    console.log('publish failed with error ' + err);
                } else {
                    console.log('publish succeeded');
                }
            });

            bodyMessage = JSON.stringify("Order Status Updated");
            break;
        }          
        case 'OPTIONS':{
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.BASE_URL}`,
                    'Access-Control-Allow-Methods': 'GET, PUT',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '86400' // 24 hours
                },
                body: ''
            }
        }    
        default:{
            status = 405;
            bodyMessage = JSON.stringify({ message: 'Method Not Allowed' });
            break;
        }
    }
    
    return {
        statusCode: status,
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyMessage
    }
}
