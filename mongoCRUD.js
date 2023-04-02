const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb'); //mongodb package

var client;
var _db;

//opens mongo connection and saves _db global variable to be used throughout code
export async function openMongoConnection() {

    try{
        let uri = process.env.mongoURI; //uri hidden in environment variables for safety  
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); //connection details
        
        client.connect(); //open connection

        _db = client.db('Expresso'); //select db 

    } catch(e){
        console.log("ERROR: Could not connect to mongoDB"); 
    }
}

//closes mongo connection though client global var
export async function closeMongoConnection(){
    try{
        await client.close(); //close connection

        console.log("closed connection")
    } catch(e){
        console.log("ERROR: Could not close connection to mongoDB");
    }
}

/*Create operations return the mongodb insertedID, so for subsequent document calls, just use the return value. 
Becauase a value is returned, await must be used in the caller*/
//creates 1 user given a json object
export async function createUser(userJsonObject){
    try{
        let insertedUser =  await _db.collection('Users').insertOne(userJsonObject);
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

        return  insertedMenu.insertedId;
    } catch(e){
        console.log("ERROR: Could not create menu item");
    }
}

//creates 1 order given a json object
export async function createOrder(orderJsonObject){
    try{
        let insertedOrder =  await _db.collection('Orders').insertOne(orderJsonObject); //insert one given a json object
        console.log(`Successfully created order!`); 

        return await insertedOrder.insertedId;
    } catch(e){
        console.log("ERROR: Could not create order");
    }
}

/*Read operations return the document given the mongoID 
*/
//looks for 1 user that matches given mongodb insertedID object
export async function readUser(mongoID){
    try{
        let foundUser =  _db.collection('Users').findOne({_id: mongoID}); 
        console.log(`Found user! Returning them now`);
        
        return foundUser;
    } catch(e){
        console.log("ERROR: Could not find user, check if passing mongoID object");
    }
}



//looks for 1 menu item that matches given mongodb insertedID object
export async function readMenuItem(mongoID){
    try{
        let foundMenuItem = await _db.collection('Menu').findOne({_id: mongoID}); 
        console.log(`Found menu item! Returning them now:`); 
        
        return foundMenuItem;

    } catch(e){
        console.log("ERROR: Could not find menu item, check if passing mongoID object");
    }
}

//looks for 1 order that matches given mongodb insertedID object
export async function readOrder(mongoID){
    try{
        let foundOrder = await _db.collection('Orders').findOne({_id: mongoID}); 
        console.log(`Found order! Returning them now:`);
        
        return foundOrder;

    } catch(e){
        console.log("ERROR: Could not find order, check if passing mongoID object");
    }
}


/*Unlike the previous counterparts, these plural options take in any JSON format as query 
and prints more than 1 result (if applicable), from here you would take the _id string and
convert it to the mongoDB ID object so that it can be used in the rest of the functions. THESE DO NOT RETURN ANYTHING ATM*/
//prints all users that match the query
export async function readUsers(query){
    try{
        let cursor = await _db.collection('Users').find(query).toArray(); 
        console.log(`Found user(s), if you want to work with a single object, take the _id string and convert it to an object for future use:`);
        console.log(JSON.stringify(cursor, null, 2)); //Return the content of collection directly in json format
        
    } catch(e){
        console.log("ERROR: Could not find users, check if passing JSON format");
    }
}

//prints all menu items that match the query
export async function readMenuItems(query){
    try{
        let cursor = _db.collection('Menu').find(query).toArray(); 
        console.log(`Found menu item(s), if you want to work with a single object, take the _id string and convert it to an object for future use:`);
        console.log(JSON.stringify(cursor, null, 2)); //Return the content of collection directly in json format

    } catch(e){
        console.log("ERROR: Could not find menu items, check if passing JSON format");
    }
}

//prints all orders that match the query
export async function readOrders(query){
    try{
        let cursor = _db.collection('Users').find(query).toArray(); 
        console.log(`Found order(s), if you want to work with a single object, take the _id string and convert it to an object for future use:`);
        console.log(JSON.stringify(cursor, null, 2)); //Return the content of collection directly in json format

    } catch(e){
        console.log("ERROR: Could not find orders, check if passing JSON format");
    }
}

//convert string found from plural reads (seen above) into mongodb ID object that is needed for CRUD operations
export async function stringToMongoID(mongoIDString){
    let ID = new ObjectId(mongoIDString);
    return ID;
}






//Update operation overwrites or creates data using the incoming updates as parameters. Since there is no returns, can be used async
//updates 1 user that matches mongoID object and updates them with given json object (if they exist)
export async function updateUser(mongoID, updatesToBeMade){
    try{

        await _db.collection('Users').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated user!`);

    } catch(e){
        console.log("ERROR: Could not update user, check if they exist first");
    }
}

//updates 1 menu that matches mongoID object and updates them with given json object (if they exist)
export async function updateMenuItem(mongoID, updatesToBeMade){
    try{
        await _db.collection('Menu').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated menu item!`);

    } catch(e){
        console.log("ERROR: Could not update menu item, check if it exist first");
    }
}

//updates 1 order that matches mongoID object and updates them with given json object (if they exist)
export async function updateOrder(mongoID, updatesToBeMade){
    try{
        await _db.collection('Orders').updateOne({_id: mongoID}, {$set: updatesToBeMade});
        console.log(`Updated order!`);

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

export async function getUsersFromMongo() {
    try{
        let usersArray = await _db.collection('Users').find({}).toArray();; //select users collection and put into array

        var jsonUsers =  JSON.stringify(usersArray, null, 2); //Return the content of collection directly in json format
        
        return jsonUsers;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}


//Adding or redeeming points to a user. The points attribute must be a numerical value (not a string)
export async function addPoints(mongoID, pointsToAdd){
    try{
        if(Math.sign(pointsToAdd) == -1 ) //making points positive cause adding points should only add points
            pointsToAdd = pointsToAdd * -1;

        await _db.collection('Users').updateOne({_id: mongoID}, {$inc: {points: pointsToAdd}});
        console.log(`added points to user!`);


    } catch(e){
        console.log("ERROR: Could not add points to user, check if they exist first");
    }
}

export async function redeemPoints(mongoID, pointsToRedeem){
    try{

        if(Math.sign(pointsToRedeem) != -1 ) //making points negative cause redeeming points should only remove points
            pointsToRedeem = pointsToRedeem * -1;

        await _db.collection('Users').updateOne({_id: mongoID}, {$inc: {points: pointsToRedeem}});
        console.log(`redeemed points from user!`);

    } catch(e){
        console.log("ERROR: Could not redeem points from user, check if they exist first");
    }
}

export async function addInventory(mongoID, stockToAdd){
    try{
        if(Math.sign(stockToAdd) == -1 ) //making stock positive cause adding stock should only add stock
            stockToAdd = stockToAdd * -1;

        await _db.collection('Menu').updateOne({_id: mongoID}, {$inc: {points: pointsToAdd}});
        console.log(`added stock to item!`);


    } catch(e){
        console.log("ERROR: Could not add stock to menu item, check if it exists first");
    }
}

export async function removeInventory(mongoID, stockToRemove){
    try{

        if(Math.sign(stockToRemove) != -1 ) //making stock negative cause removing stock should only subtract stock
            stockToRemove = stockToRemove * -1;

        await _db.collection('Menu').updateOne({_id: mongoID}, {$inc: {points: stockToRemove}});
        console.log(`removed stock from item!`);
 

    } catch(e){
        console.log("ERROR: Could not remove stock from item, check if it exists first");
    }
}

export async function getFoodprepOrdersFromMongo() {
    try{
        let filters = {status: "Received" , paymentStatus: "Paid"}; //insert hard codded query filters here in json format, rn looking at statuses as query for foodprep
        
        let ordersArray = await _db.collection('Orders').find(filters).toArray();; //select orders collection and put into array

        var jsonOrders =  JSON.stringify(ordersArray, null, 2); //Return the content of collection directly in json format
        
        return jsonOrders;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}


/*
//deletes ALL users, used for testing only
export async function emptyUserCollection(){
    _db.collection('Users').deleteMany({});
    console.log("ALL USERS DELETED")
}
*/