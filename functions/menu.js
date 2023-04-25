/**
 * This is the serverless function that contains the functions for menu API
 */
const { createMenuItem, readMenuItems, updateMenuItem, deleteMenuItem} = require('./mongoNETLIFY')
const { openMongoConnection } = require('./mongoNETLIFY');


openMongoConnection();

exports.handler = async (event, context) => { //handler function
    let status = 200;
    let bodyMessage;
    
    switch(event.httpMethod){
        case 'POST':{ //adds menu item to the menu 
            const addMenuItem = await createMenuItem();
            bodyMessage = JSON.stringify(addMenuItem)       
            break;
        }
        case 'GET':{ //get all menu items matching queries 
            let query = {};
            if (Object.keys(event.queryStringParameters).length !== 0) {
                query = event.queryStringParameters;
            }
            const menuArray = await readMenuItems(query);
            
            bodyMessage = JSON.stringify(menuArray, null, 2)
            break;
        }    
        case 'PUT':{ //updates menu item
            const menuItem = JSON.parse(event.body);
            updateMenuItem(menuItem.data.object.name, menuItem.updates); //TODO check if query by name works

            bodyMessage = JSON.stringify(`Menu item Updated`);
            break;
        }       
        case 'DELETE':{ //deletes menu item
            const menuItem = JSON.parse(event.body);
            deleteMenuItem(menuItem.data.object.name); //delete menu TODO check if id is value JSON object
    
            bodyMessage = JSON.stringify("Order Deleted");
            break;
        }    
        case 'OPTIONS':{
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
        default:{
            status = 405;
            bodyMessage = JSON.stringify({ message: 'Method Not Allowed' });
            break;
        }
<<<<<<< HEAD

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
=======
>>>>>>> c31360e8fa889283228447937543cf1860076f0b
    }
    
    return {
        statusCode: status,
        body: bodyMessage
    }
}