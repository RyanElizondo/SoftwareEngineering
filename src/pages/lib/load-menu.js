import path from 'path';
import { promises as fs } from 'fs';

const databaseReady = true;

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadMenu() {

    if(databaseReady) {
        //mongodb and fs packages
        const { MongoClient, ServerApiVersion } = require('mongodb'); 
        const fs = require('fs'); 

        //connection details
        const uri = process.env.mongoURI; //uri hidden in environment variables for safety
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); 
        let menuItemsArray = []; ///array used to hold collection

        try{
            client.connect(); //attempt connection

            const menu = client.db('Expresso').collection('Menu'); //select menu collection

            menuItemsArray =  await menu.find({}).toArray(); //fill array with documents

        } catch(e){
            console.error(e);
        } finally{
            client.close(); //close connection

            //Return the content of collection directly in json format
            return JSON.parse(JSON.stringify(menuItemsArray, null, 2));
        }
        
    } else {
        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json'); 

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/menudata.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }

}