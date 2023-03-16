import { useDispatch, useSelector } from 'react-redux';
import { useId, useState } from 'react';
import { useRouter } from 'next/router'
import { addItem } from '../features/order/orderSlice'

/**
 * A flexible React component that represents a menu item
 *
 * Required information in props: props.name, props.customizations, props.menuId, props.price, props.quantity
 * each customization prop will be an object with type of selection to make and an array of customization options
 * example: radiobutton, bagelType: [Plain, Everything, Sesame, Blueberry],
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import MenuItemCustomization from "@/components/MenuItemCustomization";
import {selectCartId, selectItems} from "../features/order/orderSlice";

export default function MenuItem( {name, customizations, price, inventory} ){
    const router = useRouter();
    const dispatch = useDispatch();

    const quantityInputId = useId();

    const [quantity, setQuantity] = useState(1);
    const handleQtyChange = (event) => {
        setQuantity(event.target.value);
    }

    const initializeCustomState = () => {
        let initialCustomState = {}
        if(customizations === null || customizations === undefined) return {};
        for(let i = 0; i < customizations.length; i++) {
            const custom = customizations[i];
            let state = {};
            if(custom.type === "checkbox") {
                //state = custom.options.map( (option) => ({[option]: false}))

                //convert options array to state object
                custom.options.forEach( option => {
                    state[option] = false
                })
            } else if(custom.type === "radiobutton") {
                state = custom.options[0];
            } else if(custom.type==="boolean") {
                state = custom.options;
            }
            initialCustomState = {...initialCustomState, [custom.name]: state}
        }
        return initialCustomState;
    }

    const initialState = initializeCustomState();
    const [customState, setCustomState] = useState(initialState);
    const cartId = useSelector(selectCartId);

    const handleAddItem = (event) => {
        //add order item object to redux store
        event.preventDefault() //possible point of error. investigate later

        const orderItem = {
            name: name,
            customizations: customState,
            cartId: cartId,
            quantity: quantity,
            price: quantity*price
        }
        dispatch(addItem({item: orderItem}));
        router.push('/order');
    }

    const updateCustomState = (type, customName, value) => {
        let finalVal = value;
        if(type==="boolean") finalVal = !customState[customName];
        else if(type==="checkbox") {
            const checkboxGroup = customState[customName];
            checkboxGroup[value] = !checkboxGroup[value];
            finalVal = checkboxGroup;
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
            <h6 className="menu-item-price">{`Price: $${price}`}</h6>
            <h6 className="menu-item-inventory">{`${inventory} in stock`}</h6>
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
                {`Add to order $${price * quantity}`}
            </button>
        </div>
    )
}