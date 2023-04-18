import MenuItem from './MenuItem'

/**
 * Submenu component: bakery, sandwiches, beverages
 * Required from props: name, items, state, and state setter
 * @param submenu
 * @returns {JSX.Element}
 * @constructor
 */
export default function Submenu( {name, items, visibleState, updateVisibleState} ) {

    const updateViewSubmenu = () => {
        updateVisibleState(name, !visibleState);
    }

    return (
        <div className="submenu-holder">
            <h3 className="submenu-title submenu-button" onClick={updateViewSubmenu}>{name} </h3>
            <ul className="submenu-list">
                {visibleState ? (items.map((item, index) => (
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