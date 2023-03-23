const { MongoClient, ServerApiVersion } = require('mongodb'); //mongodb package

var client;
var _db;

//opens mongo connection and saves _db global variable to be used throughout code
export async function openMongoConnection() {

    try{
        let uri = process.env.mongoURI; //uri hidden in environment variables for safety  
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); //connection details
        
        client.connect(); //open connection

        _db = client.db('Expresso'); //select db collection

    } catch(e){
        console.log("ERROR: Could not connect to server"); 
    }
}

//closes mongo connection though client global var
export async function closeMongoConnection(){
    try{
        client.close(); //close connection
    } catch(e){
        console.log("ERROR: Could not close connection to server");
    }
}

//creates 1 user given a json object
export async function createUser(userJsonObject){
    try{
        let insertedUser = _db.collection('Users').insertOne(userJsonObject); //insert one given a json object
        console.log(`Successfully created user with id: ${insertedUser.insertedId}`); 

    } catch(e){
        console.log("ERROR: Could not create user");
    }
}

//creates 1 menu item given a json object
export async function createMenuItem(menuJsonObject){
    try{
        let insertedMenu = _db.collection('Menu').insertOne(menuJsonObject); //insert one given a json object
        console.log(`Successfully created menu item with _id: ${insertedMenu.insertedId}`); 

    } catch(e){
        console.log("ERROR: Could not create menu item");
    }
}

//creates 1 order given a json object
export async function createOrder(orderJsonObject){
    try{
        let insertedOrder = _db.collection('Orders').insertOne(orderJsonObject); //insert one given a json object
        console.log(`Successfully created order with _id: ${insertedOrder.insertedId}`); 

    } catch(e){
        console.log("ERROR: Could not create order");
    }
}

//looks for 1 user that matches filters that are given as a json object
export async function readUser(queries){
    try{
        let findUser = _db.collection('Users').findOne(queries); 
        console.log(`Found user: ${findUser}`); 

    } catch(e){
        console.log("ERROR: Could not find user");
    }
}

export async function readMenuItem(queries){
    try{
        let findMenuItem = _db.collection('Menu').findOne(queries); 
        console.log(`Found menu item: ${findMenuItem}`); 

    } catch(e){
        console.log("ERROR: Could not find menu item");
    }
}

export async function readOrder(queries){
    try{
        let findOrder = _db.collection('Orders').findOne(queries); 
        console.log(`Found order: ${findOrder}`); 

    } catch(e){
        console.log("ERROR: Could not find order");
    }
}

export async function updateUser(mongoID, updatesToBeMade){
    try{
        _db.collection('Users').updateOne(mongoID, updatesToBeMade); 
        console.log(`Updated user: ${_db.collection('Users').findOne(mongoID)}`); 

    } catch(e){
        console.log("ERROR: Could not update user, check if they exist first");
    }
}

export async function updateMenuItem(mongoID, updatesToBeMade){
    try{
        _db.collection('Menu').updateOne(mongoID, updatesToBeMade); 
        console.log(`Updated menu item: ${_db.collection('Menu').findOne(mongoID)}`); 

    } catch(e){
        console.log("ERROR: Could not update menu item, check if it exist first");
    }
}

export async function updateOrder(mongoID, updatesToBeMade){
    try{
        _db.collection('Orders').updateOne(mongoID, updatesToBeMade); 
        console.log(`Updated order: ${_db.collection('Orders').findOne(mongoID)}`); 

    } catch(e){
        console.log("ERROR: Could not update order, check if it exist first");
    }
}

export async function deleteUser(){

}

export async function deleteMenuItem(){

}

export async function deleteOrder(){

}









export async function getMenuFromMongo() {  
    try{

        let menu = _db.collection('Menu'); //select menu collection

        let menuItemsArray =  await menu.find({}).toArray(); //fill array with documents

        var jsonMenu = await JSON.stringify(menuItemsArray, null, 2); //Return the content of collection directly in json format

        //console.log(typeof(jsonMenu));
        return jsonMenu;

    } catch(e){
        //console.error(e); //output error
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