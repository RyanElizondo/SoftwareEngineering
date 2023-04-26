import React, {useState} from "react";

const priceObjString = (priceObj) => {
    return Object.values(priceObj.tiers).toString();
}

export default function({item, index, setInventory}) {

    const handleSetInventory = (e) => {
        let input = parseInt(item.inventory) 
        if(input < 0 || isNaN(input)) {
            input = 0;
        } 
        try {
                setInventory(item.name, input); 
                const reqInfo = {...item, inventory: input}
                fetch("http://localhost:9999/.netlify/functions/menu",
                    {
                        method: "PUT",
                        body: JSON.stringify(reqInfo,null,2),
                        headers: {
                            "Content-Type": "application/json"
                        }
                        
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
                   value={item.inventory}
                   onChange={(e) => setInventory(item.name, e.target.value)}
                   min="0"
            />
            <button
                className="set-inventory-button"
                onClick={handleSetInventory}
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
