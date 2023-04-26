/**
 * This is the serverless function that contains the functions for menu API
 */
const { createMenuItem, readMenuItems, updateMenuItem, deleteMenuItem} = require('./mongoNETLIFY')
const { openMongoConnection } = require('./mongoNETLIFY');




exports.handler = async (event, context) => { //handler function
    openMongoConnection();
    let status = 200;
    let bodyMessage;
   
    switch(event.httpMethod){
        case 'POST':{ //adds menu item to the menu
            console.log("Received menu POST method");
            const newItem = JSON.parse(event.body);
            console.log(newItem);
            const addMenuItem = await createMenuItem(newItem);
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
        case 'PUT':{ //updates menu item inventory
            const menuItem = JSON.parse(event.body); 
            updateMenuItem({name: menuItem.name}, {inventory: menuItem.inventory});
       
            bodyMessage = JSON.stringify(`Menu item Updated`);
            break;
        }       
        case 'DELETE':{ //deletes menu item
            const menuItem = JSON.parse(event.body);
            deleteMenuItem({name: menuItem.name}); 
    
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