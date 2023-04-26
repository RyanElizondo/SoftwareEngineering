/**
 * This is the serverless function that handles the manager orders page APIs
 */
const { getPaidOrders, createOrder, readOrders, updateOrder, deleteOrder} = require('./mongoNETLIFY')
const { openMongoConnection } = require('./mongoNETLIFY');  //mongoCRUD.js
const Ably = require('ably');
const ably = new Ably.Realtime(process.env.ABLY_API_KEY);

openMongoConnection();

exports.handler = async (event, context) => { //handler function

    let status = 200;
    let bodyMessage;
    
    switch(event.httpMethod){
        case 'POST':{ //add order
            const orderData = JSON.parse(event.body);
            const addedOrder = await createOrder(orderData);
            
            bodyMessage = JSON.stringify(`Customer added with ID: ${addedOrder}`); //TODO check if I can just use the event.body._id instead, so we dont have to await for createOrder
            break;
        }
        case 'GET':{ //get all orders matching queries 
            let query = {};
            if(event.queryStringParameters === '/managerorders/?status=paid'){
                bodyMessage = getPaidOrders();
                break; //TODO test if this break works
            } else if (Object.keys(event.queryStringParameters).length !== 0) {
                query = event.queryStringParameters;
            }
            const ordersArray = await readOrders(query);
            
            bodyMessage = JSON.stringify(ordersArray, null, 2)
            break;
        }    
        case 'PUT':{ //update ANY order attribute
            const order = JSON.parse(event.body);
            const id = order.data.object._id;
            updateOrder(id, order); //update order status TODO check if id is value JSON object
      
            bodyMessage = JSON.stringify("Order Updated");
            break;
        }       
        case 'DELETE':{ //delete order
            const order = JSON.parse(event.body);
            deleteOrder(order.data.object._id); //delete order TODO check if id is value JSON object
    
            bodyMessage = JSON.stringify("Order Deleted");
            break;
        }    
        case 'OPTIONS':{
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.BASE_URL}`,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
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