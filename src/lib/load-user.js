import path from 'path';
import { promises as fs } from 'fs';
import {openMongoConnection, readUser, closeMongoConnection} from "./mongoNEXT";

//TODO @database team: replace json data fetching with a call to MongoDB's menu collection
const databaseReady = true;

// The following function is shared with getServerSideProps and API routes from a `lib/` directory
export async function loadUser(userSession) {

    if(databaseReady) {
        try{ //load user acc
            openMongoConnection();

            const user = await readUser(userSession);
    
            return JSON.parse(user);
        } catch(e){
            console.log("Could not get user profile")
        } finally{
            try{
                closeMongoConnection();
            } catch(e){
                console.log("Could not close connection");
            } 
        };
        
    } else {
        //Find the absolute path of the json directory
        const jsonDirectory = path.join(process.cwd(), 'json');

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/userBACKUP.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }

}