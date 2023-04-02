const {getUsersFromMongo, readUsers, createUser, updateUser, } = require('../mongoCRUD')
const { MongoClient } = require('mongodb'); //mongodb package
const { openMongoConnection, closeMongoConnection } = require('../mongoCRUD');  //mongoCRUD.js
const { readUser } = require('mongoCRUD');
const uri = process.env.mongoURI;
const dbName = 'Expresso';
const collectionName = 'Orders';

//openMongoConnection();//open mongo connection

//const mongoClient = new MongoClient(process.env.MONGODB_URI);

//const clientPromise = mongoClient.connect();

openMongoConnection();

exports.handler = async (event, context) => { //handler function
    if(event.httpMethod === 'GET') {
        //retrieves all customers account data
        // handle GET request: determine if query parameters are provided
        if (Object.keys(event.queryStringParameters).length === 0) {
            //console.log("hello")
            const menu = await getUsersFromMongo(); //get all orders from mongodb
            return {
                statusCode: 200,
                body: JSON.stringify(menu)
            }
        } else {
            //GET filtered results from mongodb and parse query string
            const filter = event.queryStringParameters; //get filter from query string
            const users = await readUsers(filter); //read menu items from mongodb
            return { 
                statusCode: 200,
                body: JSON.stringify(menu)
            }
        }

    } else if (event.httpMethod === 'POST') {
        //adds customer account data to the database
        const customer = JSON.parse(event.body); 
        const addCustomer = await createUser(customer);
        return {
            statusCode: 200,
            body: JSON.stringify(addCustomer)
        }

    } else if(event.httpMethod === 'PUT') {
        //update customer account data
        const id = event.path.split('/')[2]; //get id from url
        const updates = JSON.parse(event.body); //get order from body
        const result = await updateUser(id, updates); //update order status
       
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }

    } else if(event.httpMethod === 'DELETE') {
        //deletes customer account data
        const id = event.path.split('/')[2]; //get id from url
        const result = await deleteUser(id); //update order status
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