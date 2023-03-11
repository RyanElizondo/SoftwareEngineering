import { loadMenu } from '../pages/lib/load-menu'
import Submenu from '../components/Submenu'
//import { useDispatch } from 'react-redux';

/** Renders full menu and implements client-sided routing to browse through submenus.
 * This component also keeps track of a user's order
 *
 * Menu component: holder and navigator of submenu components (bakery, sandwiches, beverages)
 * Required information: props.name, props.submenuList
 * @param menu retrieved from database
 * @returns {JSX.Element}
 * @constructor
 */
export default function Menu({menu}) {
    const submenus = menu.submenus;


    return (
        <div className="menu-holder menu-flex">
            {submenus.map( (submenu,index) => (
                <Submenu
                    name={submenu.name}
                    items={submenu.items}
                    key={index}
                />
            ) )}
        </div>
    )
}

export async function getStaticProps() {
    //Get menu from /lib/load-menu
    const menu = await loadMenu()
    return { props: { menu } }
}

