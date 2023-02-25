/**
 * A flexible React component that represents a menu item
 *
 * Required information in props: props.name, props.customizations, props.menuId, props.price, props.quantity
 * each customization prop will be an object with type of selection to make and an array of customization options
 * example: radiobutton, bagelType: [Plain, Everything, Sesame, Blueberry],
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import MenuItemCustomization from "@/components/MenuItemCustomization";

export default function MenuItem( {name, customizations, price, inventory} ){

    const handleSubmit = (event) => {

    }

    return (
        <div className="menu-item">
            <h5 className="menu-item-title">{name}</h5>
            <div className="customizations-holder">
                {customizations === undefined ? null : customizations.map( (custom) => (
                    <MenuItemCustomization
                        name={custom.name}
                        type={custom.type}
                        options={custom.options}
                    />
                ) )}
            </div>
            <h6 className="menu-item-price">{`Price: $${price}`}</h6>
            <h6 className="menu-item-inventory">{`${inventory} in stock`}</h6>
            <button>
                Add to order
            </button>
        </div>
    )
}