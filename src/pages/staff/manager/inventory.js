import React, { useState } from "react";
import { loadManager } from "@/lib/load-manager";
import InventoryItem from "@/components/InventoryItem";

const InventoryManagement = ( {menu} ) => {
    const [items, setItems] = useState(menu);

    const setInventory = (itemName, amount) => {
        console.log(`setting inventory for ${itemName} to ${amount}`)
        const newItems = [...items];
        const item = newItems.find((item) => item.name === itemName);
        if (item) {
            item.inventory = amount;
            setItems(newItems);
            console.log(item);
        }
    };

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
                    { menu.map((item, i) =>  <InventoryItem item={item} index={i} setInventory={setInventory}/>)  }
                </ul>
            </div>
    );
};

export async function getServerSideProps() {
    const menu = await loadManager();
    console.log("MENU");
    console.log(menu);
    return { props: { menu } };
}

export default InventoryManagement;
