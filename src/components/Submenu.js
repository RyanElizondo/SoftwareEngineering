import MenuItem from './MenuItem'

/**
 * Submenu component: bakery, sandwiches, beverages
 * Required from props: props.name (string), props.items (array of item objects)
 * @param submenu
 * @returns {JSX.Element}
 * @constructor
 */
export default function Submenu( {name, items} ) {
    return (
        <div className="submenu-holder">
            <h3 className="submenu-title">{name}</h3>
            <ul className="submenu-list">
                {items.map( (item,index) => (
                    <MenuItem
                        name={item.name}
                        customizations={item.customizations}
                        //menuId={item.menuId}
                        price={item.price}
                        inventory={item.inventory}
                        key={index}
                    />
                ) )}
            </ul>
        </div>
    )
}