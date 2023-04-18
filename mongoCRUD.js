const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb'); //mongodb package

var client;
var _db;

/**
 * Creates a connection to our mongoDB cluster using the URI hidden as an environment variable
 * @returns {Promise<void>}
 */
async function openMongoConnection() {
    try{
        let uri = process.env.mongoURI; 
       
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        
        client.connect(); 

        _db = client.db('Expresso'); 

    } catch(e){
        console.log("ERROR: Could not connect to mongoDB"); 
    }
}

/**
 * Closes the connection to our mongoDB cluster
 * @returns {Promise<void>}
 */
async function closeMongoConnection(){
    try{
        await client.close(); //close connection (need to see if await is necessary here, seems like connections do not close without it)
    } catch(e){
        console.log("ERROR: Could not close connection to mongoDB");
    }
}

/*============================CREATE STUFF============================= */
/** This creates a User document in the User collection of our mongoDB 
 * @param {object} JSON object
 * @return {new objectID} mongoDB ID that can be used for RUD operations
 */
async function createUser(userJsonObject){
    try{
        let insertedUser =  await _db.collection('Users').insertOne(userJsonObject);
        console.log(`Successfully created user!`); 

        return insertedUser.insertedId;
    } catch(e){
        console.log("ERROR: Could not create user");
    }
}

/** This creates a Menu document in the Menu collection of our mongoDB 
 * @param {object} JSON object
 * @return {new objectID} mongoDB ID that can be used for RUD operations
 */
async function createMenuItem(menuJsonObject){
    try{
        let insertedMenu = await _db.collection('Menu').insertOne(menuJsonObject);
        console.log(`Successfully created menu item!`); 

        return  insertedMenu.insertedId;
    } catch(e){
        console.log("ERROR: Could not create menu item");
    }
}

/** This creates a User document in the User collection of our mongoDB 
 * @param {object} JSON object
 * @return {new objectID} mongoDB ID that can be used for RUD operations
 */
async function createOrder(orderJsonObject){
    try{
        let insertedOrder =  await _db.collection('Orders').insertOne(orderJsonObject); //insert one given a json object
        console.log(`Successfully created order!`);
        return await insertedOrder.insertedId;
    } catch(e){
        console.log("ERROR: Could not create order", e);
    }
}

/*============================READ SINGULAR STUFF============================= */
/** This reads a User document in the User collection of our mongoDB 
 * @param {new objectID} mongoDB ID 
 * @return {object} user document 
 */
async function readUser(mongoID){
    try{
        let foundUser =  await _db.collection('Users').findOne({_id: mongoID}); 
        console.log(`Found user! Returning them now`);
        
        
        return foundUser;
    } catch(e){
        console.log("ERROR: Could not find user, check if passing mongoID object");
    }
}

/** This reads a Menu item document in the Menu collection of our mongoDB 
 * @param {new objectID} mongoDB ID 
 * @return {object} menu document 
 */
async function readMenuItem(mongoID){
    try{
        let foundMenuItem = await _db.collection('Menu').findOne({_id: mongoID}); 
        console.log(`Found menu item! Returning it now`); 
        
        return foundMenuItem;

    } catch(e){
        console.log("ERROR: Could not find menu item, check if passing mongoID object");
    }
}

/** This reads an Order document in the Orders collection of our mongoDB 
 * @param {new objectID} mongoDB ID 
 * @return {object} order document 
 */
async function readOrder(mongoID){ 
    try{
        let foundOrder = await _db.collection('Orders').findOne({_id: mongoID}); 
        console.log(`Found order! Returning it now`);
        
        return foundOrder;

    } catch(e){
        console.log("ERROR: Could not find order, check if passing mongoID object");
    }
}

/*============================READ PLURAL STUFF============================= */
/** This prints all the documents in the Users collection that match the query 
 * @param {object} JSON object
 * @return nothing, just prints to console. Can be used to get the string to convert to mongoDB ID
 */
async function readUsers(query){ 
    try{
        let cursor = await _db.collection('Users').find(query).toArray(); 
        console.log(`Found user(s), if you want to work with a single object, take the _id string and convert it to an object for future use:`);
        console.log(JSON.stringify(cursor, null, 2)); 
        
    } catch(e){
        console.log("ERROR: Could not find users, check if passing JSON format query");
    }
}

/** This prints all the documents in the Menu collection that match the query 
 * @param {object} JSON object
 * @return nothing, just prints to console. Can be used to get the string to convert to mongoDB ID
 */
async function readMenuItems(query){
    try{
        let cursor = _db.collection('Menu').find(query).toArray(); 
        console.log(`Found menu item(s), if you want to work with a single object, take the _id string and convert it to an object for future use:`);
        console.log(JSON.stringify(cursor, null, 2));

    } catch(e){
        console.log("ERROR: Could not find menu items, check if passing JSON format query");
    }
}

/** This prints all the documents in the Orders collection that match the query 
 * @param {object} JSON object
 * @return nothing, just prints to console. Can be used to get the string to convert to mongoDB ID
 */
async function readOrders(query){
    try{
        let cursor = _db.collection('Users').find(query).toArray(); 
        console.log(`Found order(s), if you want to work with a single object, take the _id string and convert it to an object for future use:`);
        console.log(JSON.stringify(cursor, null, 2)); 

    } catch(e){
        console.log("ERROR: Could not find orders, check if passing JSON format query");
    }
}

/*============================STRING TO MONGOID OBJECT============================= */
/** This converts an ID as a string to a new mongoDB ID 
 * @param {string} mongoDB ID
 * @return {new objectID} mongoDB ID that can be used for RUD operations 
 */
async function stringToMongoID(mongoIDString){
    let ID = new ObjectId(mongoIDString);
    return ID;
}

/*============================UPDATE STUFF============================= */
/** This updates a user document
 * @param {new objectID} mongoDB ID  
 * @param {object} JSON object
 * @return nothing, if you want to check if updates went through, use R operation
 */
async function updateUser(mongoID, updatesToBeMade){ 
    try{

        await _db.collection('Users').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated user!`);

    } catch(e){
        console.log("ERROR: Could not update user, check if they exist first");
    }
}

/** This updates a menu item document
 * @param {new objectID} mongoDB ID  
 * @param {object} JSON object
 * @return nothing, if you want to check if updates went through, use R operation
 */
async function updateMenuItem(mongoID, updatesToBeMade){ 
    try{
        await _db.collection('Menu').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated menu item!`);

    } catch(e){
        console.log("ERROR: Could not update menu item, check if it exist first");
    }
}

/** This updates an order document
 * @param {new objectID} mongoDB ID  
 * @param {object} JSON object
 * @return nothing, if you want to check if updates went through, use R operation
 */
async function updateOrder(mongoID, updatesToBeMade){ 
    try{
        await _db.collection('Orders').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated order!`);

    } catch(e){
        console.log("ERROR: Could not update order, check if it exist first");
    }
}

/*============================DELETE STUFF============================= */
/** This deletes a user document
 * @param {new objectID} mongoDB ID  
 * @return nothing
 */
async function deleteUser(mongoID){
    try{    
        _db.collection('Users').deleteOne({_id: mongoID}); 
        console.log(`Deleted user!`); 
    } catch(e){
        console.log("No user matched the mongo ID. Deleted 0 users.")
    }
}

/** This deletes a menu item document
 * @param {new objectID} mongoDB ID  
 * @return nothing
 */
async function deleteMenuItem(mongoID){
    try{    
        _db.collection('Menu').deleteOne({_id: mongoID}); 
        console.log(`Deleted menu item!`); 
    } catch(e){
        console.log("No menu item matched the mongo ID. Deleted 0 items.")
    }
}

/** This deletes an order document
 * @param {new objectID} mongoDB ID  
 * @return nothing
 */
async function deleteOrder(mongoID){
    try{     
        _db.collection('Orders').deleteOne({_id: mongoID}); 
        console.log(`Deleted order!`); 
    } catch(e){
        console.log("No order matched the mongo ID. Deleted 0 order.")
    }
}

/*============================GET ALL ITEMS============================= */
/** This gets the full menu for customer front end
 * @param nothing
 * @return {string} full menu as a JSON string to be parsed into an object for later
 */
async function getMenuFromMongo() {  
    try{
        let menuItemsArray = await _db.collection('Menu').find({}).toArray();

        var jsonMenu =  JSON.stringify(menuItemsArray, null, 2);
        
        return jsonMenu;

    } catch(e){
        console.log("ERROR: Did not send menu json string")
    }
}

/** This gets the all the orders for food prep front end
 * @param nothing
 * @return {string} all orders as a JSON string to be parsed into an object for later
 */
async function getOrdersFromMongo() {
    try{
        let ordersArray = await _db.collection('Orders').find({}).toArray(); 

        var jsonOrders =  JSON.stringify(ordersArray, null, 2); 
        
        return jsonOrders;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}

/** This gets the all the users for manager front end
 * @param nothing
 * @return {string} all users as a JSON string to be parsed into an object for later
 */
async function getUsersFromMongo() {
    try{
        let usersArray = await _db.collection('Users').find({}).toArray(); 

        var jsonUsers =  JSON.stringify(usersArray, null, 2); 
        
        return jsonUsers;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}

/*============================POINTS STUFF============================= */
/** This adds points to a User
 * @param {new objectID} mongoDB ID
 * @param {int} points to add to the User
 * @return nothing, R if you want to check if points went through
 */
async function addPoints(mongoID, pointsToAdd){ 
    try{
        if(Math.sign(pointsToAdd) == -1 ) 
            pointsToAdd = pointsToAdd * -1;

        await _db.collection('Users').updateOne({_id: mongoID}, {$inc: {points: pointsToAdd}});
        console.log(`added points to user!`);


    } catch(e){
        console.log("ERROR: Could not add points to user, check if they exist first");
    }
}

/** This removes points from a User
 * @param {new objectID} mongoDB ID
 * @param {int} points to remove to the User
 * @return nothing, R if you want to check if points went through
 */
async function redeemPoints(mongoID, pointsToRedeem){
    try{

        if(Math.sign(pointsToRedeem) != -1 ) 
            pointsToRedeem = pointsToRedeem * -1;

        await _db.collection('Users').updateOne({_id: mongoID}, {$inc: {points: pointsToRedeem}});
        console.log(`redeemed points from user!`);

    } catch(e){
        console.log("ERROR: Could not redeem points from user, check if they exist first");
    }
}

/*============================INVENTORY STUFF============================= */
/** This adds inventory to a menu item
 * @param {new objectID} mongoDB ID
 * @param {int} inventory to add to menu item
 * @return nothing, R if you want to check if points went through
 */
async function addInventory(mongoID, stockToAdd){
    try{
        if(Math.sign(stockToAdd) == -1 )
            stockToAdd = stockToAdd * -1;

        await _db.collection('Menu').updateOne({_id: mongoID}, {$inc: {inventory: stockToAdd}});
        console.log(`added stock to item!`);

    } catch(e){
        console.log("ERROR: Could not add stock to menu item, check if it exists first");
    }
}

/** This removes inventory from a menu item
 * @param {new objectID} mongoDB ID
 * @param {int} inventory to remove to menu item
 * @return nothing, R if you want to check if points went through
 */
async function removeInventory(mongoID, stockToRemove){
    try{

        if(Math.sign(stockToRemove) != -1 ) 
            stockToRemove = stockToRemove * -1;

        await _db.collection('Menu').updateOne({_id: mongoID}, {$inc: {inventory: stockToRemove}});
        console.log(`removed stock from item!`);
 

    } catch(e){
        console.log("ERROR: Could not remove stock from item, check if it exists first");
    }
}

/*============================FOOD PREP QUERY ============================= */
/** This gets the orders from Orders collection that have status: "Received" & paymentStatus: "Paid" which will be used for food prep front end
 * @param nothing
 * @return {string} JSON string to be parsed into an object for later
 */
async function getPaidOrders() {
    try{
        console.log("retrieving received and paid orders from mongo")
        let filters = {status: "Received" , paymentStatus: "Paid"}; 
        let ordersArray = await _db.collection('Orders').find(filters).toArray();

        const jsonOrders =  JSON.stringify(ordersArray);

        console.log("returning from getPaidOrders:");
        console.log(jsonOrders);
        return jsonOrders;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}

/** This updates an order status from Received =(1)> In Progress =(2)> Complete (once signalled from food prep front end and server to do so)
 * @param {new objectID} mongoDB ID
 * @param {int} status code from server 
 * @return nothing, use R to confirm
 */
async function updateOrderStatus(mongoID, statusCode) { 
    try{
        
        let updatesToBeMade;
     
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

/** This gets all menu items that fit a certain submenu  
 * @param {string} name of submenu (sandwiches, beverages, bakery)
 * @return {string} JSON string that can be parsed for later 
 */
async function getSubmenu(submenuString) { 
    try{     
        
        let cursor = _db.collection('Menu').find({submenu: submenuString}).toArray(); 

        var jsonSubmenu =  JSON.stringify(cursor, null, 2);
        
        return jsonSubmenu;


    } catch(e){
        console.log("ERROR: Could not read submenu")
    }
}

/** This updates an order status to paid and puts in the total of the order (data from STRIPE)  
 * @param {string} stripe unique client ID
 * @param {int} order total (in cents) 
 * @return nothing
 */
async function updateOrderFromStripe(stripeClientSecret, orderTotal){

    let stripeOrder = await readOrder({stripeID: stripeClientSecret});
    let ID = stripeOrder._id; 

    let orderDollars = orderTotal / 100;
    updateOrder(ID, {paymentStatus: "Paid", total: orderDollars});
    
}


module.exports = {getSubmenu, updateOrderStatus, getPaidOrders, openMongoConnection, closeMongoConnection, updateUser, updateMenuItem, updateOrder, deleteUser, deleteMenuItem, deleteOrder, getMenuFromMongo, getOrdersFromMongo, getUsersFromMongo, addPoints, redeemPoints, addInventory, removeInventory, readMenuItems, readUsers, readOrders, readUser, readMenuItem, readOrder, createUser, createMenuItem, createOrder, stringToMongoID}

/*============================FULL DELETES STUFF============================= */
/** This deletes ALL USERS
 * @param nothing
 * @return nothing
 */
/*
export async function emptyUserCollection(){ 
    _db.collection('Users').deleteMany({});
    console.log("ALL USERS DELETED")
}
*/
