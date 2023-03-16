import MenuItemCustomization from "@/components/MenuItemCustomization";

/**
 *
 * @param item. Represents an instance of a customized menu item added to a customer's order
 * item has the following properties: item.name, item.cartId, item.quantity, item.customizations
 * @returns {JSX.Element}
 * @constructor
 */
export default function OrderItem( {item} ) {
    //TODO next: create order item component
    return (
        <div className="order-item-holder flex-container">
            <h3 className="order-title">{item.name}</h3>
            <div className="order-item-customizations-holder">
                {item.customizations === undefined ? null : item.customizations.map( (custom, index) => (
                    <h4 className="order-item-customization-title">{custom.name}</h4>
                ) )}
            </div>
        </div>
    )
}