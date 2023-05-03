const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb'); //mongodb package
let uri = process.env.mongoURI; 
let OPTIONS = {
    appname: "netlify",
    maxIdleTimeMS: 1800000,
    maxPoolSize: 50,
    maxConnecting: 5,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  };
var client = new MongoClient(uri, OPTIONS);

var connected = false;
var _db;


/*============================CONNECTION STUFF============================= */
/**
 * Creates a connection to our mongoDB cluster using the URI hidden as an environment variable
 * @returns {Promise<void>}
 */
async function openMongoConnection() {

    if (connected) {
        console.log("connection already made, going to reuse it")
    } else{
        try{
            
            connected = client.connect(); 
    
            _db = client.db('Expresso'); 
    
            console.log("created new connection")           
    
        } catch(e){
            console.log("ERROR: Could not connect to mongoDB"); 
        }
    }  
}

/**
 * Closes the connection to our mongoDB cluster
 * @returns {Promise<void>}
 */
async function closeMongoConnection(){
    try{
        client.close(); //close connection (need to see if await is necessary here, seems like connections do not close without it)
    } catch(e){
        console.log("ERROR: Could not close connection to mongoDB");
    }
}

/*============================CREATE STUFF============================= */
/** This creates a User document in the User collection of our mongoDB 
 * @param {object} JSON object
 * @return {string} OAuth string we assign
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
        //convert price and inventory to numbers from strings
        const withNumbers = {...menuJsonObject,
            price: parseInt(menuJsonObject.price),
            inventory: parseInt(menuJsonObject.inventory)
        }
        let insertedMenu = await _db.collection('Menu').insertOne(withNumbers);
        console.log(`Successfully created menu item!`); 

        return  insertedMenu.insertedId;
    } catch(e){
        console.log("ERROR: Could not create menu item");
    }
}

/** This creates a User document in the User collection of our mongoDB 
 * @param {object} JSON object
 * @return {string} Stripe string we assign
 */
async function createOrder(orderJsonObject){
    const orderMongoObject = {...orderJsonObject, _id: orderJsonObject.stripeClientSecret}
    delete orderMongoObject.stripeClientSecret;
    //delete orderMongoObject.items.cardId; //TODO check if this works

    try{
        let insertedOrder =  await _db.collection('Orders').insertOne(orderMongoObject); //insert one given a json object
        console.log(`Successfully created order!`);
        return insertedOrder.insertedId;
    } catch(e){
        console.log("ERROR: Could not create order", e);
    }
}

/*============================READ PLURAL STUFF============================= */
/** This returns all the documents in the Users collection that match the query
 * @param {object} JSON object
 * @return {array} Users that match query, use JSON stringify to make it more readable
 */
async function readUsers(query){ 
    try{
        let cursor = await _db.collection('Users').find(query).toArray(); 
        console.log(`Found user(s), returning as array`);

        return cursor;
    } catch(e){
        console.log("ERROR: Could not find users, check if passing JSON format query");
    }
}

/** This returns all the documents in the Menu collection that match the query
 * @param {object} JSON object
 * @return {array} of Menu Items that match query, use JSON stringify to make it more readable
 */
async function readMenuItems(query){
    try{
        let cursor = _db.collection('Menu').find(query).toArray(); 
        console.log(`Found menu item(s), returning as array`);

        return cursor;

    } catch(e){
        console.log("ERROR: Could not find menu items, check if passing JSON format query");
    }
}

/** This returns all the documents in the Orders collection that match the query
 * @param {object} JSON object
 *  @return {Array} array of Orders that match query, use JSON stringify to make it more readable
 */
async function readOrders(query){
    try{
        let cursor = _db.collection('Orders').find(query).toArray();
        console.log(`Found order(s), returning as array`);

        return cursor;

    } catch(e){
        console.log("ERROR: Could not find orders, check if passing JSON format query");
    }
}

/*============================UPDATE STUFF============================= */
/** This updates a user document
 * @param {object} JSON object for queries 
 * @param {object} JSON object for updates
 * @return nothing, if you want to check if updates went through, use R operation
 */
async function updateUser(userID, updatesToBeMade){
    try{
        delete updatesToBeMade.id
        await _db.collection('Users').updateOne({_id: userID}, {$set: updatesToBeMade}, {
            upsert: true
        });
        console.log(`Updated user!`);

    } catch(e){
        console.log("error");
        console.log(e);
        console.log("ERROR: Could not update user, check if they exist first");
    }
}

/** This updates a menu item document
 * @param {object} JSON object for queries 
 * @param {object} JSON object for updates
 * @return nothing, if you want to check if updates went through, use R operation
 */
async function updateMenuItem(query, updates){
    try{
        await _db.collection('Menu').updateOne(query, {$set: updates});
        console.log(`Updated menu item!`);

    } catch(e){
        console.log("ERROR: Could not update menu item, check if it exist first");
    }
}

/** This updates an order document
 * @param {object} JSON object for queries 
 * @param {object} JSON object for updates
 * @return nothing, if you want to check if updates went through, use R operation
 */
async function updateOrder(query, updatesToBeMade){ 
    try{
        await _db.collection('Orders').updateOne(query, {$set: updatesToBeMade});
        console.log(`Updated order!`);

    } catch(e){
        console.log("ERROR: Could not update order, check if it exist first");
    }
}

/*============================DELETE STUFF============================= */
/** This deletes a user document
 * @param {object} JSON object for queries 
 * @return nothing
 */
async function deleteUser(query){
    try{    
        _db.collection('Users').deleteOne(query); 
        console.log(`Deleted user!`); 
    } catch(e){
        console.log("No user matched the mongo ID. Deleted 0 users.")
    }
}

/** This deletes a menu item document
 * @param {object} JSON object for queries 
 * @return nothing
 */
async function deleteMenuItem(query){
    try{    
        _db.collection('Menu').deleteOne(query); 
        console.log(`Deleted menu item!`); 
    } catch(e){
        console.log("No menu item matched the mongo ID. Deleted 0 items.")
    }
}

/** This deletes an order document
 * @param {object} JSON object for queries 
 * @return nothing
 */
async function deleteOrder(query){
    try{     
        _db.collection('Orders').deleteOne(query); 
        console.log(`Deleted order!`); 
    } catch(e){
        console.log("No order matched the mongo ID. Deleted 0 order.")
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
        let filters = {status: "Received" , paymentStatus: "Paid"};

        let ordersArray = readOrders(filters);

        const jsonOrders =  JSON.stringify(ordersArray, null, 2);

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
            updateOrder({_id: mongoID}, updatesToBeMade)
        } else if (statusCode == 2){
            updatesToBeMade = {status: "Complete"}
            updateOrder({_id: mongoID}, updatesToBeMade)
        } else {
            console.log("Sent invalid status code")
        }

    } catch(e){
        console.log("ERROR: Did not update order status")
    }

}

/*============================STRIPE STUFF ============================= */
/** Once order passes successfully through STRIPE, order status is updated to paid and order total is added to doc
 * @param {string} stripeClientSecret unique client ID
 * @param {int} orderTotal (in cents) 
 * @return nothing
 */
async function successfulStripe(stripeClientSecret, orderTotal){

    let orderDollars = orderTotal / 100;
    
    updateOrder({_id: stripeClientSecret}, {paymentStatus: "Paid", total: orderDollars});
    
}

/** Once order unsuccessfully passes through STRIPE, order status is updated to Card Declined or whatever we want to make it
 * @param {string} stripe unique client ID
 * @return nothing
 */
async function unsuccessfulStripe(stripeClientSecret){

    //await updateOrder(stripeClientSecret, {paymentStatus: "Card Declined"});
    await deleteOrder(stripeClientSecret);
    
}

module.exports = {
    openMongoConnection, closeMongoConnection, 
       
    createUser, createMenuItem, createOrder,
    readUsers, readMenuItems,  readOrders,
    updateUser, updateMenuItem, updateOrder, 
    deleteUser, deleteMenuItem, deleteOrder, 
    
    addPoints, redeemPoints, 
    addInventory, removeInventory,

    updateOrderStatus, getPaidOrders, 

    successfulStripe, unsuccessfulStripe, 
}

