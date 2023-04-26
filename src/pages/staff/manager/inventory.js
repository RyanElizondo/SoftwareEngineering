import React, { useState } from "react";
import { loadManager } from "@/lib/load-manager";
import InventoryItem from "@/components/InventoryItem";
import CreateMenuItem from "@/components/CreateMenuItem"
import { useSession } from 'next-auth/react'

const InventoryManagement = ( {menu} ) => {

    const {data, status} = useSession();

    if (data?.user.role === "customer") {
        return <p>Access Denied</p>
    }

    if (status !== "authenticated") {
        return <p>Access Denied</p>
    }

    if (data?.user.name !== "Manager") {
        return <p>Access Denied</p>
    }

    const [items, setItems] = useState(menu);

    const setInventory = (itemName, amount) => {
        const newItems = [...items];
        const item = newItems.find((item) => item.name === itemName);
        if (item) {
            item.inventory = amount;
            setItems(newItems);
        }
    };

    return (
        <div className="manager-page">
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
            <div className="manager-functions-holder">
                <h2 className="inventory-title">Create Menu Item</h2>
                <CreateMenuItem />
            </div>
        </div>

    );
};

export async function getServerSideProps() {
    const menu = await loadManager();
    return { props: { menu } };
}

export default InventoryManagement;
