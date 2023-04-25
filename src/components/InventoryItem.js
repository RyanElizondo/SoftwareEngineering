import React, {useState} from "react";

const priceObjString = (priceObj) => {
    return Object.values(priceObj.tiers).toString();
}

export default function({item, index, setInventory}) {

    const [inputValue, setInputValue] = useState(item.inventory);
    const handleInputChange = (e) => {
        const inputNumStr = e.target.value;

        try {
            const inputNum = parseInt(inputNumStr);
            if(inputNum < 0 || isNaN(inputNum)) {
                setInputValue(0);
                return;
            } else {
                setInputValue(e.target.value);
                const reqInfo = {...item, inventory: inputNum}
                //TODO Test this server call and see if Netlify updates MongoDB correctly
                //make call to server to update menu collection in MongoDB
                console.log("making a call to netlify/functions/menu")
                console.log(reqInfo)
                fetch("https://expressocafeweb.netlify.app/.netlify/functions/menu",
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(reqInfo)
                    }
                ).then(response => response.json())
                    .then(data => {
                        // Handle API response
                        console.log(data);
                    })
                    .catch(error => {
                        // Handle API error
                        console.error(error);
                    });
            }
        } catch(e) {
            console.log(e)
        }
    }

    const removeInventory = (itemName) => {
        console.log(`Remove item from menu called for ${itemName}`)
    }

    return (
        <li className="item-inventory" key={index + item} id={index % 2 === 0 ? "even" : "odd"}>
            <p className="item-inventory-title inventory-detail">{item.name}</p>
            <p className="item-inventory-submenu inventory-detail">{item.submenu}</p>
            <p className="item-inventory-price inventory-detail">{typeof item.price === "object" ? priceObjString(item.price) : item.price}</p>
            <p className="item-inventory-inventory inventory-detail">{item.inventory}</p>
            <input type="number"
                   label={`${item.name}`}
                   className="item-inventory-input"
                   value={inputValue}
                   onChange={handleInputChange}
                   min="0"
            />
            <button
                className="set-inventory-button"
                disabled={item.inventory <= 0}
                onClick={() => setInventory(item.name, inputValue)}
            >
                Set Inventory
            </button>
            <button
                className="remove-inventory-button"
                onClick={() => removeInventory(item.name)}
            >
                Delete
            </button>
        </li>
    )
}