import React, { useState } from "react";
import {loadManager} from "@/lib/load-manager";

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
        priceObj.tiers.toString();
    }

    const renderItem = (item, index) => {
        return (
            <li className="item-inventory" key={index}>
                <h5 className="item-inventory-title">{item.name}</h5>
                <h6 className="item-inventory-submenu">{item.submenu}</h6>
                <h6 className="item-inventory-price">{typeof item.price === "object" ? priceObjString(item.price) : item.price}</h6>
                <h6 className="item-inventory-inventory">{item.inventory}</h6>
                <input type="text" label={`${item.name}`} />
                <button
                    className="decrement-inventory-button"
                    disabled={item.inventory <= 0}
                    onClick={() => setInventory(item.name, )}
                >
                    Set Inventory
                </button>
            </li>
        )
    }

    return (
        <div>
            <h2>Inventory Management</h2>
            <ul>
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
