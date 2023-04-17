import MenuItem from './MenuItem'
import {useState} from "react";

/**
 * Submenu component: bakery, sandwiches, beverages
 * Required from props: props.name (string), props.items (array of item objects)
 * @param submenu
 * @returns {JSX.Element}
 * @constructor
 */
export default function Submenu( {name, items} ) {
    const [viewSubmenu, setViewSubmenu] = useState(false);

    const updateViewSubmenu = (event) => {
        setViewSubmenu(!viewSubmenu);
    }

    return (
        <div className="submenu-holder">
            <h3 className="submenu-title submenu-button" onClick={updateViewSubmenu}>{name} </h3>
            <ul className="submenu-list">
                {viewSubmenu ? (items.map((item, index) => (
                    <MenuItem
                        name={item.name}
                        customizations={item.customizations}
                        //menuId={item.menuId}
                        price={item.price}
                        inventory={item.inventory}
                        key={index}
                    />
                ))) : null}
            </ul>
        </div>
    )
}