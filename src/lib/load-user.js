import path from 'path';
import { promises as fs } from 'fs';

//TODO @database team: replace json data fetching with a call to MongoDB's menu collection
const databaseReady = false;

// The following function is shared with getServerSideProps and API routes from a `lib/` directory
export async function loadUser() {

    if(databaseReady) {
        //databases team: this is example code so feel free to delete

        /* Call an external API endpoint or database to get menu JSON object
        const res = await fetch('https://.../posts/')
        const data = await res.json()
        return data */
    } else {
        //Find the absolute path of the json directory
        const jsonDirectory = path.join(process.cwd(), 'json');

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/user.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }

}