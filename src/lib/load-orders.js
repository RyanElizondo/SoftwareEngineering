import path from 'path';
import { promises as fs } from 'fs';
import { openMongoConnection, getPaidOrders, closeMongoConnection} from './mongoNEXT';

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadOrders() {

    try{
        //load orders for foodprep       
        openMongoConnection();

        const mongoOrders = await getPaidOrders();
        
        if(mongoOrders === {})
            return [];

        closeMongoConnection();

        //Return the content of the data file in json format
        return JSON.parse(mongoOrders);
        
    } catch(e){

        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json'); 

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/orderdata.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }
}