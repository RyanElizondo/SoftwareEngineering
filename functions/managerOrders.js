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
            
            bodyMessage = JSON.stringify(`Order added with ID: ${addedOrder}`); 
            break;
        }
        case 'GET':{ //get all orders matching queries 
            let query = JSON.parse(event.body);
            const ordersArray = await readOrders(query);
            
            bodyMessage = JSON.stringify(ordersArray, null, 2)
            break;
        }    
        case 'PUT':{ //update ANY order attribute
            const order = JSON.parse(event.body);
            const id = order._id;
            delete order._id
            const update = order
            updateOrder({_id: id}, update); 
      
            bodyMessage = JSON.stringify("Order Updated");
            break;
        }       
        case 'DELETE':{ //delete order
            const order = JSON.parse(event.body);
            const id = order._id;
            deleteOrder({_id: id}); 
    
            bodyMessage = JSON.stringify("Order Deleted");
            break;
        }    
        case 'OPTIONS':{
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': 'https://expressocafeweb.netlify.app/',
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