//Database functions for foodprepOrders API
const { getOrdersFromMongo, readMenuItems,  } = require('../mongoCRUD')

exports.handler = async (event, context) => {
    if(event.httpMethod === 'GET') {
        // handle GET request: determine if query parameters are provided
        if (event.queryStringParameters === null) {
            const menu = getOrdersFromMongo();
            return {
                statusCode: 200,
                body: JSON.stringify(menu)
            }
        } else {
            //GET filtered results from mongodb and parse query string
        }
    } else if(event.httpMethod === 'POST') {
        //add an order to the orders collection

    } else if(event.httpMethod === 'PUT') {

    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

}

/*
const http = require('http'); //http package
const { MongoClient } = require('mongodb'); //mongodb package
const { openMongoConnection, closeMongoConnection } = require('./mongoCRUD');  //mongoCRUD.js
const url = process.env.mongoURI;
const dbName = 'Expresso';
const collectionName = 'Orders';

const server = http.createServer(async (req, res) => { //create server and handle requests
    if (req.url === '/foodpreprders' && req.method === 'GET') { //GET: retrieve all orders from mongoDB database

        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true }); //connection details
        client.connect((err) => { //open connection
            if (err) { //if error, close connection
                console.log("ERROR: Could not connect to mongoDB");
                client.close();
                return;
            }
            const db = client.db(dbName); //select db collection
            db.collection(collectionName).find().toArray((err, orders) => { //find all orders
                if (err) { //if error, close connection
                    console.log("ERROR: Could not retrieve orders");
                    client.close();
                    return;
                }
                res.setHeader('Content-Type', 'application/json'); //set header to json
                res.end(JSON.stringify(orders)); //send orders as json
                //Special case GET /menu/?status=received
                //Uses URL parameter to filter orders based on status
                if (req.url.includes('status=received')) {
                    const filteredOrders = orders.filter(order => order.status === 'received');
                    res.setHeader('Content-Type', 'application/json'); //set header to json
                    res.end(JSON.stringify(filteredOrders)); //send orders as json
                }
                client.close();
            });
        });
    } else if(req.url === '/foodpreporders' && req.method === 'POST'){ //POST: add an order to the mongoDB database
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const order = JSON.parse(body);
            const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true }); //connection details
            client.connect((err) => { //open connection
                if (err) { //if error, close connection
                    console.log("ERROR: Could not connect to mongoDB");
                    client.close();
                    return;
                }
                const db = client.db(dbName); //select db collection
                db.collection(collectionName).insertOne(order, (err, result) => { //insert order
                    if (err) { //if error, close connection
                        console.log("ERROR: Could not create order");
                        client.close();
                        return;
                    } else {
                        res.setHeader('Content-Type', 'application/json'); //set header to json
                        res.end(JSON.stringify(result.ops[0])); //send result as json
                    }
                    client.close();
        
                });
            });
        });
    } else if(req.url.startsWith('/foodpreporders') && req.method === 'PUT'){ //PUT: update's order status; it is called in CheckoutForm.jsx after successful payment
        const id = req.url.split('/')[2]; //get id from url
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const status = JSON.parse(body);
            const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true }); //connection details
            client.connect((err) => { //open connection
                if (err) { //if error, close connection
                    console.log("ERROR: Could not connect to mongoDB");
                    client.close();
                    return;
                }
                const db = client.db(dbName); //select db collection
                db.collection(collectionName).updateOne({ _id: new ObjectId(id) }, { $set: { status: status } }, (err, result) => { //update order status
                    if (err) { //if error, close connection
                        console.log("ERROR: Could not update order status");
                        client.close();
                        return;
                    } else {
                        res.setHeader('Content-Type', 'application/json'); //set header to json
                        res.end(JSON.stringify(result.ops[0])); //send result as json
                    }
                    client.close();


                });
            });
        });
    } 
});
*/
