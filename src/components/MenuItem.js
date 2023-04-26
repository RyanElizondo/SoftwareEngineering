import { useDispatch, useSelector } from 'react-redux';
import { useId, useState } from 'react';
import { useRouter } from 'next/router'
import { addItem, selectCartId } from '../features/order/orderSlice'
import MenuItemCustomization from "../components/MenuItemCustomization";

/**
 * A flexible React component that represents a menu item
 *
 * Required information in props: name, customizations, price, inventory
 * each customization prop will be an object with type of selection to make and an array of customization options
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

export default function MenuItem( {name, customizations, price, inventory} ){
    const router = useRouter();
    const dispatch = useDispatch();

    const quantityInputId = useId();

    const [quantity, setQuantity] = useState(1);
    const handleQtyChange = (event) => {
        setQuantity(event.target.value);
    }

    const initialPrice = typeof price==="number" ? price : Object.values(price.tiers)[0];

    const [priceState, setPrice] = useState(initialPrice);

    const initializeCustomState = () => {
        let initialCustomState = {}
        if(customizations === null || customizations === undefined) return {};
        for(let i = 0; i < customizations.length; i++) {
            const custom = customizations[i];
            let state = {};
            if(custom.type === "checkbox") {
                //convert options array to state object
                custom.options.forEach( option => {
                    state[option] = false
                })
            } else if(custom.type === "radiobutton") {
                state = custom.options[0];
            } else if(custom.type==="boolean") {
                state = custom.options;
            } else if(custom.type==="number") {
                state = custom.options.min;
            }
            initialCustomState = {...initialCustomState, [custom.name]: state}
        }
        return initialCustomState;
    }

    const initialState = initializeCustomState();
    const [customState, setCustomState] = useState(initialState);
    const cartId = useSelector(selectCartId);

    const handleAddItem = (event) => {
        event.preventDefault()

        //add order item object to redux store
        const orderItem = {
            name: name,
            customizations: customState,
            cartId: cartId,
            quantity: quantity,
            price: priceState * quantity
        }
        dispatch(addItem({item: orderItem}));

        //redirect to /order to allow viewer to see their order
        //router.push('/order');

        //play animation to indicate to customer that their order has been added
        console.log("added item to redux store");
    }

    const updateCustomState = (type, customName, value) => {

        let finalVal = value;
        if(type==="boolean") finalVal = !customState[customName];

        else if(type==="checkbox") {
            const checkboxGroup = customState[customName];
            checkboxGroup[value] = !checkboxGroup[value];
            finalVal = checkboxGroup;

        } else if(type==="radiobutton" && typeof price==="object") {
            //update price if price is dependent on a customization
            if(typeof price === "object") {
                const dependent = price.dependent;
                //check if customization name matches price dependency
                if(dependent === customName) {
                    setPrice(price.tiers[value]);
                }
            }
        }
        setCustomState({
            ...customState,
            [customName]: finalVal
        })
    }

    const createMenuItemCustomization = (custom, index) => {

        return (
            <MenuItemCustomization
                name={custom.name}
                type={custom.type}
                options={custom.options}
                key={index}
                itemName={name}
                updateHandler={updateCustomState}
                customState={customState[custom.name]}
            />
        )
    }

    return (
        <div className="menu-item">
            <h5 className="menu-item-title">{name}</h5>
            <div className="customizations-holder">
                {customizations === undefined ? null : customizations.map( (custom, index) => (
                    createMenuItemCustomization(custom,index)
                ) )}
            </div>
            <h6 className="menu-item-price">{`Price: $${priceState}`}</h6>
            <label htmlFor={quantityInputId}>Quantity</label>
            <input id={quantityInputId}
                   className="menu-item-quantity"
                   type="number"
                   min="1"
                   defaultValue="1"
                   onChange={handleQtyChange}
                   required
                   max="12"
                   pattern="\d*"
            />

            <button onClick={handleAddItem}>
                {`Add to order $${priceState * quantity}`}
            </button>
            
        </div>
    )
}