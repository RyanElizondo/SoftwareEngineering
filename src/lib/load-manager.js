import path from 'path';
import { promises as fs } from 'fs';
import { openMongoConnection, getMenuFromMongo, closeMongoConnection} from '../../mongoCRUD';

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadManager() {

    try{
        await openMongoConnection();

        const mongoMenu = await getMenuFromMongo()
        //const { customerMenu, serverMenu } = buildFrontendMenus(JSON.parse(mongoMenu));
        //const mongoOrders = await getFoodprepOrdersFromMongo();
        //const jsonDirectory = path.join(process.cwd(), 'json');  //Absolute path to json folder
        //await fs.writeFile (jsonDirectory + './test.json', serverMenu)
        console.log(JSON.parse(mongoMenu));
        //Return the content from the database in frontend JSON workable format
        return JSON.parse(mongoMenu);

    } catch(e){
        console.log(e);

        //use local backup

        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json');

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/menudata.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    } finally {
        await closeMongoConnection();
    }
}