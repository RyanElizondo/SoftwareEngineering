import path from 'path';
import { promises as fs } from 'fs';

const databaseReady = false;

// The following function is shared with getStaticProps and API routes from a `lib/` directory

/**
 * Loads user order data from MongoDB
 * @param clientSecret Stripe client secret used to identify an individual order
 * @returns {Promise<any>}
 */
export async function loadUserOrder(clientSecret) {

    if(databaseReady === true) {
        //TODO fetch order details from Mongo given stripeClientSecret and return JSON object

    } else {
        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json');

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/userorder.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }
}