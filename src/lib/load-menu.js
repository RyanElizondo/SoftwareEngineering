import path from 'path';
import { promises as fs } from 'fs';
import { openMongoConnection, getMenuFromMongo, closeMongoConnection } from 'mongoCRUD';

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadMenu() {

    try{
        openMongoConnection();

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