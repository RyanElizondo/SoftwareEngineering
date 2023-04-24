/**
 * Renders a list of items in a single user's order
 * @param orderItems array of menu items and user's customizations
 * @returns {JSX.Element}
 * @constructor
 */
export default function UserOrderItemsList({orderItems}) {

    return(
        <ul className="user-items-holder">
            {orderItems.map(item => (
                <li className="user-order-item" key={item.itemName}>
                    {item.itemQuantity} x {item.itemName}
                    {item.customization && item.customization.length > 0 && (
                        <ul className="user-order-item-customization-holder">
                            {item.customization.map(c => (
                                <li key={c}>{c}</li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    )
}