const { MongoClient, ServerApiVersion } = require('mongodb'); //mongodb package
const uri = process.env.mongoURI; //uri hidden in environment variables for safety

var _db;              

export async function openMongoConnection() {

    try{
               
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); //connection details

        client.connect(); //open connection

        _db = client.db('Expresso'); //select db collection

    } catch(e){
        console.log("ERROR: Could not connect to server"); 
    }
}

export async function closeMongoConnection(){
    try{
        client.close(); //close connection
    } catch(e){
        console.log("ERROR: Could not close connection to server");
    }
}

export async function createUser(userJsonObject){
    try{
        let insertedUser = _db.collection('Users').insertOne(userJsonObject); //insert one given a json object
        console.log(`Successfully created user with _id: ${insertedUser.insertedId}`); 

    } catch(e){
        console.log("ERROR: Could not create user");
    }
}

export async function createMenuItem(menuJsonObject){
    try{
        let insertedMenu = _db.collection('Menu').insertOne(menuJsonObject); //insert one given a json object
        console.log(`Successfully created menu item with _id: ${insertedMenu.insertedId}`); 

    } catch(e){
        console.log("ERROR: Could not create menu item");
    }
}

export async function createOrder(orderJsonObject){
    try{
        let insertedOrder = _db.collection('Orders').insertOne(orderJsonObject); //insert one given a json object
        console.log(`Successfully created order with _id: ${insertedOrder.insertedId}`); 

    } catch(e){
        console.log("ERROR: Could not create order");
    }
}

export async function readUser(){

}

export async function readMenuItem(){

}

export async function readOrder(){

}

export async function updateUser(){

}

export async function updateMenuItem(){

}

export async function updateOrder(){

}

export async function deleteUser(){

}

export async function deleteMenuItem(){

}

export async function deleteOrder(){

}









export async function getMenuFromMongo() {  
    try{
        const menu = _db.collection('Menu'); //select menu collection

        let menuItemsArray =  await menu.find({}).toArray(); //fill array with documents

        return JSON.parse(JSON.stringify(menuItemsArray, null, 2)); //Return the content of collection directly in json format

    } catch(e){
        console.error(e); //output error
    }
}

export async function getOrdersFromMongo() {
    try{
        const orders = _db.collection('Orders'); //select menu collection

        let ordersArray =  await orders.find({}).toArray(); //fill array with documents

        return JSON.parse(JSON.stringify(ordersArray, null, 2)); //Return the content of collection directly in json format

    } catch(e){
        console.error(e); //output error
    }
}