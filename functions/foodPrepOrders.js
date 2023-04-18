//Database functions for foodprepOrders API
const { getOrdersFromMongo, readMenuItems, updateOrderStatus} = require('../mongoCRUD')
const { openMongoConnection, closeMongoConnection } = require('../mongoCRUD');  //mongoCRUD.js
const Ably = require('ably');
const ably = new Ably.Realtime(process.env.ABLY_API_KEY); //create ably instance
const channel = ably.channels.get('foodprep-orders'); //get foodprep-orders channel

channel.subscribe('foodprep-orders', (message) => { //subscribe to Received event
    console.log(`Received message: ${message.data}`);
});

openMongoConnection();

exports.handler = async (event, context) => { //handler function
    if(event.httpMethod === 'GET') {
        // handle GET request: determine if query parameters are provided
        if (Object.keys(event.queryStringParameters).length === 0) {
            //console.log("hello")
            const menu =  getOrdersFromMongo(); //get all orders from mongodb

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
        const orderObject = { //get order from body
            _id: event.path.split('/')[2],
            status: 1,
            localeDate: new Date().toLocaleString(),
            firstname: "test",
            array: ["test", "test2"]
        }
        //const id = event.path.split('/')[2]; //get id from url
        const result = await updateOrderStatus(orderObject._id, orderObject.status); //update order status

        const dataForFrontend = { //data to send to frontend
            action: 'addOrder',
            order: result
        }

        channel.publish('foodprep-orders', dataForFrontend, function (err) { //publish to ably
            if (err) {
                console.log('publish failed with error ' + err);
            } else {
                console.log('publish succeeded');
            }
        });

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
                'Access-Control-Allow-Methods': 'GET, PUT',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400' // 24 hours
            },
            body: ''
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        }
    }
}
