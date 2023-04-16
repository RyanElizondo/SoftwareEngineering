/**
 * This is the serverless function that handles the manager orders page APIs
 */
const { getOrdersFromMongo, readMenuItems, getPaidOrders, updateOrder, deleteOrder, createOrder} = require('../mongoCRUD')
const { openMongoConnection, closeMongoConnection } = require('../mongoCRUD');  //mongoCRUD.js
const Ably = require('ably');

openMongoConnection();

exports.handler = async (event, context) => { //handler function
    if(event.httpMethod === 'GET') {
        // handle GET request: determine if query parameters are provided
        if (Object.keys(event.queryStringParameters).length === 0) {
            const menu = await getOrdersFromMongo(); //get all orders from mongodb
            closeMongoConnection();
            return {
                statusCode: 200,
                body: JSON.stringify(menu)
            }
        } else if(event.queryStringParameters === '/managerorders/?status=paid'){
            const menu = await getPaidOrders();
            closeMongoConnection();
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
        //update order status
        const id = event.path.split('/')[2]; //get id from url
        const order = JSON.parse(event.body); //get order from body
        const result = await updateOrder(id, order); //update order status
        closeMongoConnection();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }

    } else if (event.httpMethod === 'DELETE') {
        //delete order
        const id = event.path.split('/')[2]; //get id from url
        const result = await deleteOrder(id); //delete order
        closeMongoConnection();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    }else if (event.httpMethod === 'POST') {
        //add order
        const orderObject = JSON.parse(event.body); //get order from body
        const result = await createOrder(orderObject); //add order
        closeMongoConnection();
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
        }
    }
    else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

}