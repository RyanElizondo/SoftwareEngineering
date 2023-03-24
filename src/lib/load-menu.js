import path from 'path';
import { promises as fs } from 'fs';
import { openMongoConnection, getMenuFromMongo, closeMongoConnection, deleteUser, createUser, updateUser } from 'mongoCRUD';
import { setTimeout } from 'timers/promises';

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadMenu() {

    try{
        openMongoConnection();

        let newID = await createUser({name:"hmmm", OAUTHID:"randomString"});

        //console.log(newID);
        //console.log("waiting 5 secs");
        //await setTimeout(5000);
        

       // updateUser(newID, {points: "5000", email: "testing@gmail.com"});

        //console.log("waiting 5 secs");
        //await setTimeout(5000);

        console.log("DONE!")
        //deleteUser(newID);








        var menu = await getMenuFromMongo();
        
        /* uncomment to write to json folder and see what getMenuFromMongo() returns
        const jsonDirectory = path.join(process.cwd(), 'json');  //Absolute path to json folder
        await fs.writeFile (jsonDirectory + '/mongomenu.json', menu) //writing to json data file
        const fileContents = await fs.readFile(jsonDirectory + '/mongomenu.json', 'utf8'); //Read the json data file
        */

        closeMongoConnection();

        //Return the content of the data file in json format
        return JSON.parse(menu);
        
    } catch(e){
        console.error(e); 

        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json'); 

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/menudata.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }
}