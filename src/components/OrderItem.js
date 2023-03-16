import {useState} from "react";

/**
 *
 * @param item. Represents an instance of a customized menu item added to a customer's order
 * item has the following properties: item.name, item.cartId, item.quantity, item.customizations
 * @returns {JSX.Element}
 * @constructor
 */
export default function OrderItem( {item} ) {
    //TODO next: create order item component
    const [cartId, setCardId] = useState(item.cartId);

    const generateCustomization = (pair, index) => {
        console.log("received generate customization for ", pair)

        let displayStr = pair[1];
        if(typeof pair[1] === "boolean") { //customization is a checkbox boolean
            displayStr = pair[1] ? `${pair[0]}` : `No ${pair[0].toLowerCase()}`;
        } else if(typeof pair[1] === "string") { //customization is a radiobutton
            displayStr = `${pair[0]}: ${pair[1]}`
        } else if(typeof pair[1] === "object") { //customization is a checkbox group
            const selections = Object.entries(pair[1]);
            selections.forEach(selection => {
                displayStr += selection[1] ? `Has ${selection[0].toLowerCase()}\n` : `No ${selection[0].toLowerCase()}\n`
            })
        } else if(typeof pair[1] === "number") {
            displayStr = `${pair[1]} ${pair[0]}`
        }

        console.log("generated display string: ", displayStr);

        return (
            <h5 className="order-item-customization" key={index}>{displayStr}</h5>
        )
    }

    const generateAllCustomizations = (itemCustoms) => {
        console.log("generating order item customization", itemCustoms);

        return (
            <div className="order-item-customization-holder">
                {itemCustoms === undefined ? null : Object.entries(itemCustoms).map(
                    (pair, index) => (generateCustomization(pair, index)) )}
            </div>
        )
    }

    return (
        <div className="order-item-holder">
            <h3 className="order-item-title">{`${cartId}. ${item.name}`}</h3>
            <div className="order-item-customizations-holder">
                {item.customizations === undefined ? null : generateAllCustomizations(item.customizations)}
            </div>
            <h3 className="order-item quantity">{`Quantity: ${item.quantity}`}</h3>
            <h3 className="order-item price">{`Price: $${item.price}`}</h3>
        </div>
    )
}