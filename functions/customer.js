const { createUser, readUsers, updateUser, deleteUser} = require('./mongoNETLIFY')
const { openMongoConnection } = require('./mongoNETLIFY');

openMongoConnection();

exports.handler = async (event, context) => { //handler function
    let status = 200;
    let bodyMessage;
    
    switch(event.httpMethod){
        case 'POST':{ //adds customer account data to the database
            const customerData = JSON.parse(event.body);
            delete customerData.image;
            const addedCustomer = await createUser(customerData);
            
            bodyMessage = JSON.stringify(`Customer added with ID: ${addedCustomer}`);
            break;
        }
        case 'GET':{ //get customer account data from database using queries 
            let query = JSON.parse(event.body);
            const usersArray = await readUsers(query); 

            bodyMessage = JSON.stringify(usersArray, null, 2);
            break;
        }    
        case 'PUT':{ //update customer account data
            const updates = JSON.parse(event.body);
            const id = updates._id;

            updateUser( id, updates); 

            bodyMessage= JSON.stringify("User Updated");
            break;
        }       
        case 'DELETE':{ //deletes customer account data
            const customerData = JSON.parse(event.body);
            deleteUser({_id: customerData._id}); 
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
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyMessage
    }
}