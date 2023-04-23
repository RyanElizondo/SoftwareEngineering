import React, {useState} from "react";
import CreateCustomization from "@/components/CreateCustomization";
import { useRouter } from "next/router";

const getInitialCustomization = (type) => {
    return {
        name: "Insert name",
        type: "Radio button",
        options: getInitialOptions(type)
    }
}

const getInitialOptions = (type) => {
    if(type === "Number") return {min: 0, max: 5}
    else if(type === "Boolean") return false;
    else if(type === "Checkbox" || type === "Radio button")  return ["Option #1 Name", "Option #2 Name"];
}

const getInitialItem = (type) => {
    return {
        name: "Set name",
        submenu: "Set submenu",
        price: 0.00,
        inventory: 0,
        customizations: [getInitialCustomization(type)]
    }
}

export default function createMenuItem() {

    const router = useRouter();

    const [newItem, setNewItem] = useState(getInitialItem("Radio button"));

    const handleChange = (field, newVal) => {
        setNewItem({...newItem, [field]: newVal});
    }

    const updateCustomization = (customization, index) => {
        const newCustoms = newItem.customizations.map( (custom, i) =>
            index === i ? customization : custom
        )
        console.log({...newItem, "customizations": newCustoms})
        setNewItem({...newItem, "customizations": newCustoms})
    }

    const addCustomization = () => {
        setNewItem({...newItem, customizations: [...newItem.customizations, getInitialCustomization("Radio button")]})
    }

    const removeCustomization = () => {
        const newCustomizations = newItem.customizations.slice(0, newItem.customizations.length - 1);
        setNewItem({...newItem, customizations: newCustomizations})
    }

    const submitMenuItem = async () => {
        //TODO check if any default options remain

        console.log("Calling Netlify /menu to create new menu item with POST request");
        console.log(newItem);
        //otherwise: add to menu
        //TODO Test this server call and see if Netlify updates MongoDB correctly
        await fetch("http://localhost:9999/.netlify/functions/menu",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem)
            }
        ).then(response => response.json())
            .then(data => {
                // Handle API response
                console.log(data);
                //TODO Redirect manager to successful page with useRouter

            })
            .catch(error => {
                // Handle API error
                console.error(error);
            });
    }

    return (
        <div className="create-menu-item-holder">
            <h2 className="create-menu-subtitle" id="name">Item name</h2>
            <input type="text" value={newItem.name} className="menu-input" id="name" onChange={(e) => handleChange("name", e.target.value)}/>
            <h2 className="create-menu-subtitle" id="submenu">Submenu name</h2>
            <input type="text" value={newItem.submenu} className="menu-input" id="submenu" onChange={(e) => handleChange("submenu", e.target.value)}/>
            <h2 className="create-menu-subtitle" id="price">Price</h2>
            <input type="number" value={newItem.price} min="0" className="menu-input" id="price" onChange={(e) => handleChange("price", e.target.value)}/>
            <h2 className="create-menu-subtitle" id="inventory">Inventory</h2>
            <input type="number" value={newItem.inventory} min="0" className="menu-input" id="name" onChange={(e) => handleChange("inventory", e.target.value)}/>
            <h2 className="create-menu-subtitle" id="customization">Customization</h2>
            <div className="all-customizations">
                <div className="customization-holder">
                    {newItem.customizations.map( (custom, index) => (
                        <CreateCustomization
                            updateHandler={updateCustomization}
                            customizationState={custom}
                            index={index}
                        />)
                    )
                    }
                </div>
                <div className="customization-buttons-holder">
                    <button className="manager-functions-add-customization" onClick={ () => addCustomization() }>Create New Customization</button>
                    <button className="manager-functions-add-customization" onClick={ () => removeCustomization() }>Remove Last Customization</button>
                </div>
                <button className="manager-functions-add-menu-item" onClick={submitMenuItem}>Create New Menu Item</button>
            </div>
        </div>
    )
}