const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); //mongodb package

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

//convert string that mongodb returns for documents into _id:'s for queries
export function mongoIDConversion(mongoID){

    let ID = new ObjectId(mongoID);

    return ID;

}


//Create operations return print statement of document's mongoDB assigned _id:
//creates 1 user given a json object
export async function createUser(userJsonObject){
    try{
        let insertedUser = await _db.collection('Users').insertOne(userJsonObject);
        console.log(`Successfully created user with id: ${insertedUser.insertedId}`); 

    } catch(e){
        console.log(e);
       // console.log("ERROR: Could not create user");
    }
}

//creates 1 menu item given a json object
export async function createMenuItem(menuJsonObject){
    try{
        let insertedMenu = await _db.collection('Menu').insertOne(menuJsonObject);
        console.log(`Successfully created menu item with _id: ${insertedMenu.insertedId}`); 

    } catch(e){
        console.log("ERROR: Could not create menu item");
    }
}

//creates 1 order given a json object
export async function createOrder(orderJsonObject){
    try{
        let insertedOrder = await _db.collection('Orders').insertOne(orderJsonObject); //insert one given a json object
        console.log(`Successfully created order with _id: ${insertedOrder.insertedId}`); 

    } catch(e){
        console.log("ERROR: Could not create order");
    }
}


//Find operation print statments should return the whole document when found
//looks for 1 user that matches filters that are given as a json object
export async function readUser(queries){
    try{
        let findUser = await _db.collection('Users').findOne(queries); 
        console.log(`Found user:`);
        console.log(findUser);

    } catch(e){
        console.log("ERROR: Could not find user");
    }
}

//looks for 1 menu item that matches filters that are given as a json object
export async function readMenuItem(queries){
    try{
        let findMenuItem = await _db.collection('Menu').findOne(queries); 
        console.log(`Found menu item:`); 
        console.log(findMenuItem);

    } catch(e){
        console.log("ERROR: Could not find menu item");
    }
}

//looks for 1 order that matches filters that are given as a json object
export async function readOrder(queries){
    try{
        let findOrder = await _db.collection('Orders').findOne(queries); 
        console.log(`Found order:`);
        console.log(findOrder);

    } catch(e){
        console.log("ERROR: Could not find order");
    }
}



//Update operation prints out updated doc (by calling read functions) so you can see the changes you made
//updates 1 user that matches mongoID and updates them with given json object (if they exist)
export async function updateUser(mongoID, updatesToBeMade){
    try{

        let convertedID = mongoIDConversion(mongoID);
        await _db.collection('Users').updateOne({_id: convertedID}, {$set: updatesToBeMade});
        console.log(`Updated user, calling readUser:`);
        readUser({_id: convertedID});   
    } catch(e){
        //console.log(e);
        console.log("ERROR: Could not update user, check if they exist first");
    }
}

//updates 1 menu that matches mongoID and updates them with given json object (if they exist)
export async function updateMenuItem(mongoID, updatesToBeMade){
    try{
        let convertedID = mongoIDConversion(mongoID);
        await _db.collection('Menu').updateOne({_id: convertedID}, {$set: updatesToBeMade});
        console.log(`Updated menu item, calling readMenuItem:`);
        readMenuItem({_id: convertedID});   
    } catch(e){
        console.log("ERROR: Could not update menu item, check if it exist first");
    }
}

//updates 1 order that matches mongoID and updates them with given json object (if they exist)
export async function updateOrder(mongoID, updatesToBeMade){
    try{
        let convertedID = mongoIDConversion(mongoID);
        await _db.collection('Orders').updateOne({_id: convertedID}, {$set: updatesToBeMade});
        console.log(`Updated order, calling readMenuItem:`);
        readOrder({_id: convertedID});   

    } catch(e){
        console.log("ERROR: Could not update order, check if it exist first");
    }
}


//delete operation print statements confirm deletion. DELETIONS CANNOT BE UNDONE!!!!!!!!!!!!!!!
//deletes 1 user that matches mongoID (if they exist)
export async function deleteUser(mongoID){
    try{
        let convertedID = mongoIDConversion(mongoID);       
        _db.collection('Users').deleteOne({_id: convertedID}); 
        console.log(`Deleted user`); 
    } catch(e){
        console.log("No user matched the mongo ID. Deleted 0 users.")
    }
}

export async function deleteMenuItem(mongoID){
    try{
        let convertedID = mongoIDConversion(mongoID);       
        _db.collection('Menu').deleteOne({_id: convertedID}); 
        console.log(`Deleted menu item`); 
    } catch(e){
        console.log("No menu item matched the mongo ID. Deleted 0 items.")
    }
}

export async function deleteOrder(mongoID){
    try{
        let convertedID = mongoIDConversion(mongoID);       
        _db.collection('Orders').deleteOne({_id: convertedID}); 
        console.log(`Deleted order`); 
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
        console.log("error sending menu json string")
    }
}

export async function getOrdersFromMongo() {
    try{
        let ordersArray = await _db.collection('Orders').find({}).toArray();; //select menu collection and put into array

        var jsonOrders =  JSON.stringify(ordersArray, null, 2); //Return the content of collection directly in json format
        
        return jsonOrders;

    } catch(e){
        console.log("error sending order json string")
    }
}