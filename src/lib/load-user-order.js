import path from 'path';
import { promises as fs } from 'fs';
import { readOrder } from '../lib/mongoNEXT'


// The following function is shared with getStaticProps and API routes from a `lib/` directory

/**
 * Loads user order data from MongoDB
 * @param clientSecret Stripe client secret used to identify an individual order
 * @returns {Promise<any>}
 */
export async function loadUserOrder(clientSecret) {

    try {
        //call mongoNEXT
        const order = await readOrder(clientSecret);
        console.log("returning LOAD ORDER");
        console.log(order);
        return order;

    } catch(e) {
        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json');

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/userorder.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }

}