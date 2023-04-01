const { MongoClient, ServerApiVersion} = require('mongodb'); //mongodb package

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
        console.log("ERROR: Could not connect to mongoDB"); 
    }
}

//closes mongo connection though client global var
export async function closeMongoConnection(){
    try{
        client.close(); //close connection
    } catch(e){
        console.log("ERROR: Could not close connection to mongoDB");
    }
}

//Create operations return the mongodb insertedID, so for subsequent document calls, just use the return value and mongoID
//need to be called with await since they return values
//creates 1 user given a json object
export async function createUser(userJsonObject){
    try{
        let insertedUser = await _db.collection('Users').insertOne(userJsonObject);
        console.log(`Successfully created user!`); 

        return insertedUser.insertedId;
    } catch(e){
        console.log("ERROR: Could not create user");
    }
}

//creates 1 menu item given a json object
export async function createMenuItem(menuJsonObject){
    try{
        let insertedMenu = await _db.collection('Menu').insertOne(menuJsonObject);
        console.log(`Successfully created menu item!`); 

        return insertedMenu.insertedId;
    } catch(e){
        console.log("ERROR: Could not create menu item");
    }
}

//creates 1 order given a json object
export async function createOrder(orderJsonObject){
    try{
        let insertedOrder = await _db.collection('Orders').insertOne(orderJsonObject); //insert one given a json object
        console.log(`Successfully created order!`); 

        return insertedOrder.insertedId;
    } catch(e){
        console.log("ERROR: Could not create order");
    }
}

//Find operation print statments should return the whole document when found
//have await in the console log to test speed but other option is await during the findOne() operation
//looks for 1 user that matches given mongodb insertedID object
export async function readUser(mongoID){
    try{
        let foundUser = await _db.collection('Users').findOne({_id: mongoID}); 
        console.log(`Found user:`);
        console.log( foundUser);

    } catch(e){
        console.log("ERROR: Could not find user, check if passing mongoID object");
    }
}

//looks for 1 menu item that matches given mongodb insertedID object
export async function readMenuItem(mongoID){
    try{
        let foundMenuItem = await _db.collection('Menu').findOne({_id: mongoID}); 
        console.log(`Found menu item:`); 
        console.log(  foundMenuItem);

    } catch(e){
        console.log("ERROR: Could not find menu item, check if passing mongoID object");
    }
}

//looks for 1 order that matches given mongodb insertedID object
export async function readOrder(mongoID){
    try{
        let foundOrder = await _db.collection('Orders').findOne({_id: mongoID}); 
        console.log(`Found order:`);
        console.log( foundOrder);

    } catch(e){
        console.log("ERROR: Could not find order, check if passing mongoID object");
    }
}



//Update operation prints out updated doc (by calling read functions) so you can see the changes you made
//updates 1 user that matches mongoID object and updates them with given json object (if they exist)
export async function updateUser(mongoID, updatesToBeMade){
    try{

        await _db.collection('Users').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated user!`);
        await readUser(mongoID);

    } catch(e){
        console.log("ERROR: Could not update user, check if they exist first");
    }
}

//updates 1 menu that matches mongoID object and updates them with given json object (if they exist)
export async function updateMenuItem(mongoID, updatesToBeMade){
    try{
        await _db.collection('Menu').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated menu item!`);
        await readMenuItem(mongoID);
    } catch(e){
        console.log("ERROR: Could not update menu item, check if it exist first");
    }
}

//updates 1 order that matches mongoID object and updates them with given json object (if they exist)
export async function updateOrder(mongoID, updatesToBeMade){
    try{
        await _db.collection('Orders').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated order!`);
        await readOrder(mongoID);   

    } catch(e){
        console.log("ERROR: Could not update order, check if it exist first");
    }
}


//delete operation print statements confirm deletion. DELETIONS CANNOT BE UNDONE!!!!!!!!!!!!!!!
//deletes 1 user that matches mongoID object (if they exist)
export async function deleteUser(mongoID){
    try{    
        _db.collection('Users').deleteOne({_id: mongoID}); 
        console.log(`Deleted user!`); 
    } catch(e){
        console.log("No user matched the mongo ID. Deleted 0 users.")
    }
}

//deletes 1 menu item that matches mongoID object (if they exist)
export async function deleteMenuItem(mongoID){
    try{    
        _db.collection('Menu').deleteOne({_id: mongoID}); 
        console.log(`Deleted menu item!`); 
    } catch(e){
        console.log("No menu item matched the mongo ID. Deleted 0 items.")
    }
}

//deletes 1 order that matches mongoID object (if they exist)
export async function deleteOrder(mongoID){
    try{     
        _db.collection('Orders').deleteOne({_id: mongoID}); 
        console.log(`Deleted order!`); 
    } catch(e){
        console.log("No order matched the mongo ID. Deleted 0 order.")
    }
}


//the following get ALL documents from respective collections
export async function getMenuFromMongo() {  
    try{

        let menuItemsArray = await _db.collection('Menu').find({}).toArray();; //select menu collection and put into array

        var jsonMenu =  JSON.stringify(menuItemsArray, null, 2); //Return the content of collection directly in json format
        
        return jsonMenu;

    } catch(e){
        console.log("ERROR: Did not send menu json string")
    }
}

export async function getOrdersFromMongo() {
    try{
        let ordersArray = await _db.collection('Orders').find({}).toArray();; //select orders collection and put into array

        var jsonOrders =  JSON.stringify(ordersArray, null, 2); //Return the content of collection directly in json format
        
        return jsonOrders;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}

export async function getOrdersFromMongo() {
    try{
        let usersArray = await _db.collection('Users').find({}).toArray();; //select users collection and put into array

        var jsonUsers =  JSON.stringify(usersArray, null, 2); //Return the content of collection directly in json format
        
        return jsonUsers;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}

//load points






/*
//deletes ALL users, used for testing only
export async function emptyUserCollection(){
    _db.collection('Users').deleteMany({});
}
*/