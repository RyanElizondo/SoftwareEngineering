const { MongoClient, ServerApiVersion} = require('mongodb'); //mongodb package
let uri = process.env.mongoURI; 
let OPTIONS = {
    appname: "Next.js",
    maxIdleTimeMS: 300000,
    maxPoolSize: 100,
    maxConnecting: 2,
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

/** Reads a user document in the User collection of MongoDB
 * @param {string} unique string from OAUTH
 * @return {object} user document 
 */
async function readUser(userID){
    try{
        let foundUser =  _db.collection('Users').findOne({_id: userID});
        console.log(`Found user! Returning them now`);

        return await foundUser;
    } catch(e){
        console.log("ERROR: Could not find user, check if passing mongoID object");
    }
}

/** This gets the full menu for customer front end
 * @param nothing
 * @return {string} full menu as a JSON string to be parsed into an object for later
 */
async function getMenuFromMongo() {  
    try{
        let menuItemsArray = _db.collection('Menu').find({}).toArray(); 

        let jsonMenu = JSON.stringify(await menuItemsArray);
        return jsonMenu;

    } catch(e){
        console.log("ERROR: Did not send menu json string")
    }
}


/*============================FOOD PREP QUERY ============================= */
/** This gets the orders from Orders collection that have status: "Received" & paymentStatus: "Paid" which will be used for food prep front end
 * @param nothing
 * @return {string} JSON string to be parsed into an object for later
 */
async function getPaidOrders() {
    try{
        
        let ordersArray = _db.collection('Orders').find({paymentStatus: "Paid"}).toArray(); 

        const jsonOrders =  JSON.stringify(await ordersArray);

        return jsonOrders;

    } catch(e){
        console.log("ERROR: Did not send order json string")
    }
}

module.exports = {openMongoConnection, closeMongoConnection, getPaidOrders, getMenuFromMongo, readUser}