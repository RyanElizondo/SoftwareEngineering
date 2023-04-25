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

    console.log(event.body);
    
    switch(event.httpMethod){
        case 'POST':{ //add order
            const orderData = JSON.parse(event.body);
            const addedOrder = await createOrder(orderData.data.object._id);
            
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
                    'Access-Control-Allow-Origin': 'https://expressocafeweb.netlify.app/',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '86400' // 24 hours
                },
                body: ''
            }
<<<<<<< HEAD
        } else if(event.queryStringParameters === '/managerorders/?status=paid'){
            await openMongoConnection();
            const menu = await getPaidOrders();
            await closeMongoConnection();
            return {
                statusCode: 200,
                body: JSON.stringify(menu)
            }

        } else {
            //GET filtered results from mongodb and parse query string
            const filter = event.queryStringParameters; //get filter from query string
            const menu = await readMenuItems(filter); //read menu items from mongodb
            closeMongoConnection();
            return { 
                statusCode: 200,
                body: JSON.stringify(menu)
            }
        }

    } else if(event.httpMethod === 'PUT') {
        await openMongoConnection();
        //update order status
        const id = event.path.split('/')[2]; //get id from url
        const order = JSON.parse(event.body); //get order from body
        const result = await updateOrder(id, order); //update order status
        await closeMongoConnection();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }

    } else if (event.httpMethod === 'DELETE') {
        await openMongoConnection();
        //delete order
        const id = event.path.split('/')[2]; //get id from url
        const result = await deleteOrder(id); //delete order
        await closeMongoConnection();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    }else if (event.httpMethod === 'POST') {
        await openMongoConnection();
        //add order
        const orderObject = JSON.parse(event.body); //get order from body
        const result = await createOrder(orderObject); //add order
        await closeMongoConnection();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } else if (event.httpMethod === 'OPTIONS') {
        /* TODO update access-control-allow-origin when merging to main */
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400' // 24 hours
            },
            body: ''
=======
        }    
        default:{
            status = 405;
            bodyMessage = JSON.stringify({ message: 'Method Not Allowed' });
            break;
>>>>>>> c31360e8fa889283228447937543cf1860076f0b
        }
    }
    
    return {
        statusCode: status,
        body: bodyMessage
    }
}