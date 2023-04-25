import path from 'path';
import { promises as fs } from 'fs';
import { openMongoConnection, getPaidOrders} from './mongoNEXT';

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadOrders() {

    try{
        //load orders for foodprep
        await openMongoConnection();

        const paidOrders = getPaidOrders();
        
        if(paidOrders === {})
            return [];

        //uncomment this if you want to look at what it returns
        const jsonDirectory = path.join(process.cwd(), 'json'); 
        await fs.writeFile(jsonDirectory + '/ordersMONGO.json', await paidOrders);    

        //Return the content of the data file in json format
        return JSON.parse( await paidOrders);
        
    } catch(e){
        console.error(e)
        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json'); 

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/ordersBACKUP.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }
}