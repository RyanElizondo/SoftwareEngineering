import path from 'path';
import { promises as fs } from 'fs';
import { openMongoConnection, getOrdersFromMongo, closeMongoConnection} from 'mongoCRUD';

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadOrders() {

    try{
        //if you need to test with old order data, just change the environment var for connection and connection will fail, thus executing catch block
        
        openMongoConnection();

        const mongoOrders = await getOrdersFromMongo();
        
        /* uncomment to write to json folder and see what getOrdersFromMongo() returns
        const jsonDirectory = path.join(process.cwd(), 'json');  //Absolute path to json folder
        await fs.writeFile (jsonDirectory + '/mongoorders.json', mongoOrders) //writing to json data file
        */

        closeMongoConnection();

        //Return the content of the data file in json format
        return JSON.parse(mongoOrders);
        
    } catch(e){
        console.error(e); 

        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json'); 

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/orderdata.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }
}