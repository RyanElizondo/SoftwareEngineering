const { getUsersFromMongo, readUsers, createUser, updateUser} = require('./mongoNETLIFY')
const { openMongoConnection, closeMongoConnection } = require('./mongoNETLIFY');

openMongoConnection();

exports.handler = async (event, context) => { //handler function
    if(event.httpMethod === 'GET') {
        //retrieves all customers account data
        // handle GET request: determine if query parameters are provided
        if (Object.keys(event.queryStringParameters).length === 0) {

            const menu = await getUsersFromMongo(); //get all orders from mongodb
            closeMongoConnection();
            return {
                statusCode: 200,
                body: JSON.stringify(menu)
            }
        } else {
            //GET filtered results from mongodb and parse query string
            const filter = event.queryStringParameters; //get filter from query string
            const users = await readUsers(filter); //read menu items from mongodb
            closeMongoConnection();
            return { 
                statusCode: 200,
                body: JSON.stringify(menu)
            }
        }

    } else if (event.httpMethod === 'POST') {
        //adds customer account data to the database
        const customer = JSON.parse(event.body); 
        const addCustomer = await createUser(customer);
        closeMongoConnection();
        return {
            statusCode: 200,
            body: JSON.stringify(addCustomer)
        }

    } else if(event.httpMethod === 'PUT') {
        //update customer account data
        const id = event.path.split('/')[2]; //get id from url
        const updates = JSON.parse(event.body); //get order from body
        const result = await updateUser(id, updates); //update order status
       closeMongoConnection();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }

    } else if(event.httpMethod === 'DELETE') {
        //deletes customer account data
        const id = event.path.split('/')[2]; //get id from url
        const result = await deleteUser(id); //update order status
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
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

}