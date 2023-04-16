import path from 'path';
import { promises as fs } from 'fs';
import {closeMongoConnection, openMongoConnection, readUser} from "../../mongoCRUD";

//TODO @database team: replace json data fetching with a call to MongoDB's menu collection
const databaseReady = true;

// The following function is shared with getServerSideProps and API routes from a `lib/` directory
export async function loadUser(userSession) {

    if(databaseReady) {
        console.log("loading user through mongo");
        await openMongoConnection();
        console.log("searching for user with id " + userSession.user.userID);
        const user = await readUser(userSession.user.userID);
        console.log("user found!!");
        console.log(user);
        //await closeMongoConnection();
        return user;
    } else {
        //Find the absolute path of the json directory
        const jsonDirectory = path.join(process.cwd(), 'json');

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/user.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }

}