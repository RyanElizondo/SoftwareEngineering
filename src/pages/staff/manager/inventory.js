import React, { useState } from "react";
import { loadManager } from "@/lib/load-manager";

const InventoryManagement = ( {menu} ) => {
    const [items, setItems] = useState(menu);

    const setInventory = (itemName, amount) => {
        const newItems = [...items];
        const item = newItems.find((item) => item.name === itemName);

        if (item) {
            item.inventory = amount;
            setItems(newItems);
        }
    };
    const priceObjString = (priceObj) => {
        return Object.values(priceObj.tiers).toString();
    }

    const renderItem = (item, index) => {
        return (
            <li className="item-inventory" key={index} id={index % 2 === 0 ? "even" : "odd"}>
                <p className="item-inventory-title inventory-detail">{item.name}</p>
                <p className="item-inventory-submenu inventory-detail">{item.submenu}</p>
                <p className="item-inventory-price inventory-detail">{typeof item.price === "object" ? priceObjString(item.price) : item.price}</p>
                <p className="item-inventory-inventory inventory-detail">{item.inventory}</p>
                <input type="text" label={`${item.name}`} className="item-inventory-input"/>
                <button
                    className="set-inventory-button"
                    disabled={item.inventory <= 0}
                    onClick={() => setInventory(item.name, )}
                >
                    Set Inventory
                </button>
            </li>
        )
    }

    return (

            <div className="inventory-holder">
                <h2 className="inventory-title">Inventory Management</h2>
                <ul className="inventory-list">
                    <li className="item-inventory" key={"-1"}>
                        <p className="item-inventory-title inventory-detail">Item Name</p>
                        <p className="item-inventory-submenu inventory-detail">Submenu</p>
                        <p className="item-inventory-price inventory-detail">Price</p>
                        <p className="item-inventory-inventory inventory-detail">Inventory</p>
                        <p className="item-inventory-filler"></p>
                    </li>
                    { menu.map((item, i) => ( renderItem(item, i) ) ) }
                </ul>
            </div>


    );
};

export async function getServerSideProps() {
    const menu = await loadManager();
    return { props: { menu } };
}

export default InventoryManagement;
