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
            updateMenuItem(menuItem.name, menuItem.updates); //TODO check if query by name works

            bodyMessage = JSON.stringify(`Menu item Updated`);
            break;
        }       
        case 'DELETE':{ //deletes menu item
            const id = event.path.split('/')[2];
            deleteMenuItem(id); //delete menu TODO check if id is value JSON object
    
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
    }
    
    return {
        statusCode: status,
        body: bodyMessage
    }
}