import path from 'path';
import { promises as fs } from 'fs';

const databaseReady = false;

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadUserOrder() {

    if(databaseReady === true) {

    } else {
        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json');

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/userorder.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }
}