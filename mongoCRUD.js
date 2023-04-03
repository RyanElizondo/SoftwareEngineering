const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb'); //mongodb package

var client;
var _db;

/*============================CONNECTION STUFF============================= */
async function openMongoConnection() {//opens mongo connection and saves _db global variable to be used throughout code

    try{
        let uri = process.env.mongoURI; //uri hidden in environment variables for safety  
        console.log(uri);
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); //connection details
        
        client.connect(); //open connection

        _db = client.db('Expresso'); //select db 

    } catch(e){
        console.log("ERROR: Could not connect to mongoDB"); 
    }
}

async function closeMongoConnection(){ //closes mongo connection though client global var
    try{
        await client.close(); //close connection (need to see if await is necessary here, seems like connections do not close without it)
    } catch(e){
        console.log("ERROR: Could not close connection to mongoDB");
    }
}

/*============================CREATE STUFF============================= */
async function createUser(userJsonObject){//creates 1 user given a json object
    try{
        let insertedUser =  await _db.collection('Users').insertOne(userJsonObject);
        console.log(`Successfully created user!`); 

        return insertedUser.insertedId;
    } catch(e){
        console.log("ERROR: Could not create user");
    }
}

async function createMenuItem(menuJsonObject){//creates 1 menu item given a json object
    try{
        let insertedMenu = await _db.collection('Menu').insertOne(menuJsonObject);
        console.log(`Successfully created menu item!`); 

        return  insertedMenu.insertedId;
    } catch(e){
        console.log("ERROR: Could not create menu item");
    }
}

async function createOrder(orderJsonObject){ //creates 1 order given a json object
    try{
        let insertedOrder =  await _db.collection('Orders').insertOne(orderJsonObject); //insert one given a json object
        console.log(`Successfully created order!`); 

        return await insertedOrder.insertedId;
    } catch(e){
        console.log("ERROR: Could not create order");
    }
}

/*============================READ SINGULAR STUFF============================= */
async function readUser(mongoID){ //looks for 1 user that matches given mongodb insertedID object
    try{
        let foundUser =  _db.collection('Users').findOne({_id: mongoID}); 
        console.log(`Found user! Returning them now`);
        
        return foundUser;
    } catch(e){
        console.log("ERROR: Could not find user, check if passing mongoID object");
    }
}

async function readMenuItem(mongoID){//looks for 1 menu item that matches given mongodb insertedID object
    try{
        let foundMenuItem = await _db.collection('Menu').findOne({_id: mongoID}); 
        console.log(`Found menu item! Returning it now`); 
        
        return foundMenuItem;

    } catch(e){
        console.log("ERROR: Could not find menu item, check if passing mongoID object");
    }
}

async function readOrder(mongoID){ //looks for 1 order that matches given mongodb insertedID object
    try{
        let foundOrder = await _db.collection('Orders').findOne({_id: mongoID}); 
        console.log(`Found order! Returning it now`);
        
        return foundOrder;

    } catch(e){
        console.log("ERROR: Could not find order, check if passing mongoID object");
    }
}

/*============================READ PLURAL STUFF============================= */
async function readUsers(query){ //prints all users that match the query
    try{
        let cursor = await _db.collection('Users').find(query).toArray(); 
        console.log(`Found user(s), if you want to work with a single object, take the _id string and convert it to an object for future use:`);
        console.log(JSON.stringify(cursor, null, 2)); //print the content of collection directly in json format
        
    } catch(e){
        console.log("ERROR: Could not find users, check if passing JSON format query");
    }
}

async function readMenuItems(query){ //prints all menu items that match the query
    try{
        let cursor = _db.collection('Menu').find(query).toArray(); 
        console.log(`Found menu item(s), if you want to work with a single object, take the _id string and convert it to an object for future use:`);
        console.log(JSON.stringify(cursor, null, 2)); //Return the content of collection directly in json format

    } catch(e){
        console.log("ERROR: Could not find menu items, check if passing JSON format query");
    }
}

async function readOrders(query){ //prints all orders that match the query
    try{
        let cursor = _db.collection('Users').find(query).toArray(); 
        console.log(`Found order(s), if you want to work with a single object, take the _id string and convert it to an object for future use:`);
        console.log(JSON.stringify(cursor, null, 2)); //Return the content of collection directly in json format

    } catch(e){
        console.log("ERROR: Could not find orders, check if passing JSON format query");
    }
}

/*============================STRING TO MONGOID OBJECT============================= */
async function stringToMongoID(mongoIDString){ //convert string found from plural reads (seen above) into mongodb ID object that is needed for CRUD operations
    let ID = new ObjectId(mongoIDString);
    return ID;
}

/*============================UPDATE STUFF============================= */
async function updateUser(mongoID, updatesToBeMade){ //updates 1 user that matches mongoID object and updates them with given json object (if they exist)
    try{

        await _db.collection('Users').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated user!`);

    } catch(e){
        console.log("ERROR: Could not update user, check if they exist first");
    }
}

async function updateMenuItem(mongoID, updatesToBeMade){ //updates 1 menu that matches mongoID object and updates them with given json object (if they exist)
    try{
        await _db.collection('Menu').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated menu item!`);

    } catch(e){
        console.log("ERROR: Could not update menu item, check if it exist first");
    }
}

async function updateOrder(mongoID, updatesToBeMade){ //updates 1 order that matches mongoID object and updates them with given json object (if they exist)
    try{
        await _db.collection('Orders').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated order!`);

    } catch(e){
        console.log("ERROR: Could not update order, check if it exist first");
    }
}

/*============================DELETE STUFF============================= */
async function deleteUser(mongoID){//deletes 1 user that matches mongoID object (if they exist)
    try{    
        _db.collection('Users').deleteOne({_id: mongoID}); 
        console.log(`Deleted user!`); 
    } catch(e){
        console.log("No user matched the mongo ID. Deleted 0 users.")
    }
}

async function deleteMenuItem(mongoID){//deletes 1 menu item that matches mongoID object (if they exist)
    try{    
        _db.collection('Menu').deleteOne({_id: mongoID}); 
        console.log(`Deleted menu item!`); 
    } catch(e){
        console.log("No menu item matched the mongo ID. Deleted 0 items.")
    }
}

async function deleteOrder(mongoID){ //deletes 1 order that matches mongoID object (if they exist)
    try{     
        _db.collection('Orders').deleteOne({_id: mongoID}); 
        console.log(`Deleted order!`); 
    } catch(e){
        console.log("No order matched the mongo ID. Deleted 0 order.")
    }
}

/*============================GET ALL ITEMS============================= */
async function getMenuFromMongo() {  
    try{

        let menuItemsArray = await _db.collection('Menu').find({}).toArray();; //select menu collection and put into array

        var jsonMenu =  JSON.stringify(menuItemsArray, null, 2); //Return the content of collection directly in json format
        
        return jsonMenu;

    } catch(e){
        console.log("ERROR: Did not send menu json string")
    }
}

async function getOrdersFromMongo() {
    try{
        let ordersArray = await _db.collection('Orders').find({}).toArray(); //select orders collection and put into array

        var jsonOrders =  JSON.stringify(ordersArray, null, 2); //Return the content of collection directly in json format
        
        return jsonOrders;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}

async function getUsersFromMongo() {
    try{
        let usersArray = await _db.collection('Users').find({}).toArray(); //select users collection and put into array

        var jsonUsers =  JSON.stringify(usersArray, null, 2); //Return the content of collection directly in json format
        
        return jsonUsers;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}

/*============================POINTS STUFF============================= */

async function addPoints(mongoID, pointsToAdd){ //The points attribute must be a numerical value (not a string)
    try{
        if(Math.sign(pointsToAdd) == -1 ) //making points positive cause adding points should only add points
            pointsToAdd = pointsToAdd * -1;

        await _db.collection('Users').updateOne({_id: mongoID}, {$inc: {points: pointsToAdd}});
        console.log(`added points to user!`);


    } catch(e){
        console.log("ERROR: Could not add points to user, check if they exist first");
    }
}

async function redeemPoints(mongoID, pointsToRedeem){
    try{

        if(Math.sign(pointsToRedeem) != -1 ) //making points negative cause redeeming points should only remove points
            pointsToRedeem = pointsToRedeem * -1;

        await _db.collection('Users').updateOne({_id: mongoID}, {$inc: {points: pointsToRedeem}});
        console.log(`redeemed points from user!`);

    } catch(e){
        console.log("ERROR: Could not redeem points from user, check if they exist first");
    }
}

/*============================INVENTORY STUFF============================= */
async function addInventory(mongoID, stockToAdd){
    try{
        if(Math.sign(stockToAdd) == -1 ) //making stock positive cause adding stock should only add stock
            stockToAdd = stockToAdd * -1;

        await _db.collection('Menu').updateOne({_id: mongoID}, {$inc: {inventory: stockToAdd}});
        console.log(`added stock to item!`);

    } catch(e){
        console.log("ERROR: Could not add stock to menu item, check if it exists first");
    }
}

async function removeInventory(mongoID, stockToRemove){
    try{

        if(Math.sign(stockToRemove) != -1 ) //making stock negative cause removing stock should only subtract stock
            stockToRemove = stockToRemove * -1;

        await _db.collection('Menu').updateOne({_id: mongoID}, {$inc: {inventory: stockToRemove}});
        console.log(`removed stock from item!`);
 

    } catch(e){
        console.log("ERROR: Could not remove stock from item, check if it exists first");
    }
}

/*============================FOOD PREP QUERY ============================= */
async function getPaidOrders() {
    try{
        let filters = {status: "Received" , paymentStatus: "Paid"}; //insert hard codded query filters here in json format, rn looking at statuses as query for foodprep
        
        let ordersArray = await _db.collection('Orders').find(filters).toArray();; //select orders collection and put into array

        var jsonOrders =  JSON.stringify(ordersArray, null, 2); //Return the content of collection directly in json format
        
        return jsonOrders;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}

async function updateOrderStatus(mongoID, statusCode) { //updates order status from Recieved to In Progress (if passed 1) or In Progress to Complete (if passed 2)
    try{
        
        let updatesToBeMade;

        //need to check if mongoID being passed is an object so it can be passed to update order
        if (statusCode == 1){
            updatesToBeMade = {status: "In Progress"}
            updateOrder(mongoID, updatesToBeMade)
        } else if (statusCode == 2){
            updatesToBeMade = {status: "Complete"}
            updateOrder(mongoID, updatesToBeMade)
        } else {
            console.log("Sent invalid status code")
        }

    } catch(e){
        console.log("ERROR: Did not update order status")
    }

}





module.exports = { updateOrderStatus, getPaidOrders, openMongoConnection, closeMongoConnection, updateUser, updateMenuItem, updateOrder, deleteUser, deleteMenuItem, deleteOrder, getMenuFromMongo, getOrdersFromMongo, getUsersFromMongo, addPoints, redeemPoints, addInventory, removeInventory, readMenuItems, readUsers, readOrders, readUser, readMenuItem, readOrder, createUser, createMenuItem, createOrder, stringToMongoID}

/*============================FULL DELETES STUFF============================= */
/*
export async function emptyUserCollection(){ //deletes ALL users
    _db.collection('Users').deleteMany({});
    console.log("ALL USERS DELETED")
}
*/
