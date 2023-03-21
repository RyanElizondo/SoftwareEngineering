import path from 'path';
import { promises as fs } from 'fs';

const databaseReady = true;
const jsonDirectory = path.join(process.cwd(), 'json'); //absolute path to json folder

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadMenu() {

    if(databaseReady) {
        //mongodb and fs packages
        const { MongoClient, ServerApiVersion } = require('mongodb'); 
        const fs = require('fs'); 

        //connection details
        const uri = process.env.mongoURI; //uri hidden in environment variables for safety
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); 
        
        try{
            client.connect(); //attempt connection

            const menu = client.db('Expresso').collection('Menu'); //select menu collection

            const cursor = menu.find({}); //find all documents in collection with no filter
            let menuItemsArray =  await cursor.toArray(); //make array of documents

            fs.writeFileSync(jsonDirectory + '/mongomenu.json', JSON.stringify(menuItemsArray, null, 2)); //converting array to json and saving it as file
        } catch(e){
            console.error(e);
        } finally{
            client.close(); //close connection

            const fileContents = fs.readFileSync(jsonDirectory + '/mongomenu.json', 'utf8');

            //Return the content of the data file in json format
            return JSON.parse(fileContents);
        }
        
    } else {
        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/menudata.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }

}