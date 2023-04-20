import path from 'path';
import { promises as fs } from 'fs';
import { openMongoConnection, getMenuFromMongo, closeMongoConnection} from './mongoNEXT';

/**
 * Builds menu object with submenu lists for frontend to build menu
 * @param mongomenu array of menuItems retrieved from MongoDB
 * @returns object with serverMenu and customerMenu properties
 */
const buildFrontendMenus = (mongomenu) => {

    let sandwichItems = [];
    let bakeryItems = [];
    let beverageItems = [];

    //iterate through mongo menu and create deep copies for server and customer menu
    for(let i = 0; i < mongomenu.length; i++) {
        var customerMenuItem = mongomenu[i];
        delete customerMenuItem._id;

        if(customerMenuItem.submenu === "Sandwiches") {
            sandwichItems.push(customerMenuItem);
        } else if(customerMenuItem.submenu === "Bakery") {
            bakeryItems.push(customerMenuItem);
        } else if(customerMenuItem.submenu === "Beverages") {
            beverageItems.push(customerMenuItem);
        }
    }

    //build menus
    const customerMenu = {
        "submenus": [
            {
                "name": "Sandwiches",
                "items": sandwichItems
            },
            {
                "name": "Bakery",
                "items": bakeryItems
            },
            {
                "name": "Beverages",
                "items": beverageItems
            }
        ]
    }
  
    return customerMenu    
}

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadMenu() {

    try{
        await openMongoConnection();

        const mongoMenu = getMenuFromMongo()
        const customerMenu = buildFrontendMenus(JSON.parse(await mongoMenu));

        closeMongoConnection();

        //Return the content from the database in frontend JSON workable format
        return customerMenu;
        
    } catch(e){
        console.error(e)
        //use local backup
        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json'); 

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/menuBACKUP.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }
}