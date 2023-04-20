import path from 'path';
import { promises as fs } from 'fs';
import {openMongoConnection, readUser, closeMongoConnection} from "./mongoNEXT";


// The following function is shared with getServerSideProps and API routes from a `lib/` directory
export async function loadUser(userSession) {

        try{ //load user acc
            openMongoConnection();

            const user = await readUser(userSession);
            
            closeMongoConnection();
    
            return JSON.parse(user);
        } catch(e){
            console.error(e)
            //Find the absolute path of the json directory
            const jsonDirectory = path.join(process.cwd(), 'json');

            //Read the json data file data.json
            const fileContents = await fs.readFile(jsonDirectory + '/userBACKUP.json', 'utf8');

            //Return the content of the data file in json format
            return JSON.parse(fileContents);
        }
        
}