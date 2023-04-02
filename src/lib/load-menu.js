import path from 'path';
import { promises as fs } from 'fs';
import { openMongoConnection, getMenuFromMongo, closeMongoConnection, getOrdersFromMongo} from 'mongoCRUD';


/**
 * Builds menu object with submenu lists for frontend to build menu
 * @param mongomenu array of menuItems retrieved from MongoDB
 * @returns object with serverMenu and customerMenu properties
 */
const buildFrontendMenus = (mongomenu) => {

    let sandwichItems = [];
    let serverSandwiches = [];
    let bakeryItems = [];
    let serverBakery = [];
    let beverageItems = [];
    let serverBeverages = [];

    //iterate through mongo menu and create deep copies for server and customer menu
    for(let i = 0; i < mongomenu.length; i++) {
        const customerMenuItem = JSON.parse(JSON.stringify(mongomenu[i]));
        delete customerMenuItem._id;
        const serverMenuItem = JSON.parse(JSON.stringify(mongomenu[i]));

        if(customerMenuItem.submenu === "Sandwiches") {
            sandwichItems.push(customerMenuItem);
            serverSandwiches.push(serverMenuItem);
        } else if(customerMenuItem.submenu === "Bakery")
        {
            bakeryItems.push(customerMenuItem);
            serverBakery.push(serverMenuItem);
        } else if(customerMenuItem.submenu === "Beverages")
        {
            beverageItems.push(customerMenuItem);
            serverBeverages.push(serverMenuItem);
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

    const serverMenu = {
        "submenus": [
            {
                "name": "Sandwiches",
                "items": serverSandwiches
            },
            {
                "name": "Bakery",
                "items": serverBakery
            },
            {
                "name": "Beverages",
                "items": serverBeverages
            }
        ]
    }

    return {
        "serverMenu": serverMenu,
        "customerMenu": customerMenu
    }

}

// The following function is shared with getStaticProps and API routes from a `lib/` directory
export async function loadMenu() {

    try{
        openMongoConnection();

        const mongoMenu = await getMenuFromMongo();

        const { customerMenu, serverMenu } = buildFrontendMenus(JSON.parse(mongoMenu));
        
        
        //uncomment to write to json folder and see what function() returns
        const mongoOrders = await getOrdersFromMongo();
        const jsonDirectory = path.join(process.cwd(), 'json');  //Absolute path to json folder
        await fs.writeFile (jsonDirectory + '/mongoordersv2.json', mongoOrders) //writing to json data file
        

        closeMongoConnection();

        //Return the content from the database in frontend JSON workable format
        return customerMenu;
        
    } catch(e){
        console.log(e); 

        //use local backup

        //Absolute path to json folder
        const jsonDirectory = path.join(process.cwd(), 'json'); 

        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/menudata.json', 'utf8');

        //Return the content of the data file in json format
        return JSON.parse(fileContents);
    }
}