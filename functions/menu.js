/**
 * This is the serverless function that contains the functions for menu API
 */
const { getMenuFromMongo, readMenuItems, createMenuItem, updateMenuItem, deleteMenuItem} = require('./mongoNETLIFY')
const { openMongoConnection, closeMongoConnection } = require('./mongoNETLIFY');


openMongoConnection();

exports.handler = async (event, context) => { //handler function
    if(event.httpMethod === 'GET') {
        // handle GET request: determine if query parameters are provided
        if (Object.keys(event.queryStringParameters).length === 0) {
            const menu = await getMenuFromMongo(); //get all orders from mongodb
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

    } else if(event.httpMethod === 'POST') {
        //adds menu item to the menu 
        const addMenuItem = await createMenuItem();
        closeMongoConnection();
        return {
            statusCode: 200,
            body: JSON.stringify(addMenuItem)
        }

    }else if(event.httpMethod === 'PUT') {
        //updates menu item
        const menuItem = JSON.parse(event.body);
        const result = await updateMenuItem(menuItem._id, menuItem); //update order status
        closeMongoConnection();
        console.log("returning result from /menu: ");
        console.log(result);
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }

    } else if(event.httpMethod === 'DELETE') {
        //deletes menu item
        const id = event.path.split('/')[2]; //get id from url
        const result = await deleteMenuItem(id); //update order status
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } else if (event.httpMethod === 'OPTIONS') {
        /* TODO update access-control-allow-origin when merging to main */
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
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

}