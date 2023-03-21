import path from 'path';
import { promises as fs } from 'fs';

//TODO @database team: replace json data fetching with a call to MongoDB's menu collection
const databaseReady = true;

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadMenu() {

    if(databaseReady) {
        const { MongoClient, ServerApiVersion } = require('mongodb'); //mongoDB package
        const fs = require('fs'); //fs package
        const uri = "mongodb+srv://admin:64XGZkVicmKjjzQx@cluster0.khxufgh.mongodb.net/?retryWrites=true&w=majority"; //connection url with full CRUD credentials
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); //make connection

        const jsonDirectory = path.join(process.cwd(), 'json'); //path to json folder

        async function run() {
            try {
                const database = client.db('Expresso'); //selecting db in cluster
                const menu = database.collection('Menu'); //selecting collection in db
            
                const cursor = menu.find({}); //find all documents in collection with no filter
            
                let menuItemsList = []; 
                await (await cursor).forEach( doc => menuItemsList.push(doc)); //storing all documents from cursor into array

                fs.writeFileSync(jsonDirectory + '/mongomenu.json', JSON.stringify(menuItemsList, null, 2)); //converting array to json and saving it as file
                
            } 
            finally {
                await client.close(); //close connection to db
            }
        }

        run().catch(console.dir); //catch error

        //Read the json data from the file created from earlier 
        const fileContents = await fs.readFileSync(jsonDirectory + '/mongomenu.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
        
    } else {
        //Find the absolute path of the json directory
        const jsonDirectory = path.join(process.cwd(), 'json');

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/menudata.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }

}