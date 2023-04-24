const { createUser, readUsers, updateUser, deleteUser} = require('./mongoNETLIFY')
const { openMongoConnection } = require('./mongoNETLIFY');

openMongoConnection();

exports.handler = async (event, context) => { //handler function
    let status = 200;
    let bodyMessage;
    
    switch(event.httpMethod){
        case 'POST':{ //adds customer account data to the database
            const customerData = JSON.parse(event.body); 
            const addedCustomer = await createUser(customerData);
            
            bodyMessage = JSON.stringify(`Customer added with ID: ${addedCustomer}`);
            break;
        }
        case 'GET':{ //get customer account data from database using queries 
            let query = {};
            if (Object.keys(event.queryStringParameters).length !== 0) {
                query = event.queryStringParameters; 
            }
            const usersArray = await readUsers(query); 

            bodyMessage = JSON.stringify(usersArray, null, 2);
            break;
        }    
        case 'PUT':{ //update customer account data
            const id = event.path.split('/')[2]; 
            const updates = JSON.parse(event.body); 
            updateUser(id, updates); //TODO check if this is passed a valid id JSON object

            bodyMessage= JSON.stringify("User Updated");
            break;
        }       
        case 'DELETE':{ //deletes customer account data
            let id = event.path.split('/')[2]; 
            deleteUser(id); //TODO check if this is passed a valid id JSON object
            
            bodyMessage= JSON.stringify("User Deleted");
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