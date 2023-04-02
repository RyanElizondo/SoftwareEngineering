/**
 * This is the serverless function that handles the manager orders page APIs
 */
const { getOrdersFromMongo, readMenuItems, getPaidOrders, updateOrder, deleteOrder, createOrder} = require('../mongoCRUD')
const { MongoClient } = require('mongodb'); //mongodb package
const { openMongoConnection, closeMongoConnection } = require('../mongoCRUD');  //mongoCRUD.js
const uri = process.env.mongoURI;
const dbName = 'Expresso';
const collectionName = 'Orders';

//openMongoConnection();//open mongo connection

//const mongoClient = new MongoClient(process.env.MONGODB_URI);

//const clientPromise = mongoClient.connect();

openMongoConnection();

exports.handler = async (event, context) => { //handler function
    if(event.httpMethod === 'GET') {
        //console.log(event);
        // handle GET request: determine if query parameters are provided
        if (Object.keys(event.queryStringParameters).length === 0) {
            const menu = await getOrdersFromMongo(); //get all orders from mongodb
            return {
                statusCode: 200,
                body: JSON.stringify(menu)
            }
        } else if(event.queryStringParameters === '/managerorders/?status=paid'){
            const menu = await getPaidOrders();
            return {
                statusCode: 200,
                body: JSON.stringify(menu)
            }

        } else {
            //GET filtered results from mongodb and parse query string
            const filter = event.queryStringParameters; //get filter from query string
            const menu = await readMenuItems(filter); //read menu items from mongodb
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
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }

    } else if (event.httpMethod === 'DELETE') {
        //delete order
        const id = event.path.split('/')[2]; //get id from url
        const result = await deleteOrder(id); //delete order
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    }else if (event.httpMethod === 'POST') {
        //add order
        const order = JSON.parse(event.body); //get order from body
        const result = await createOrder(order); //add order
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

}