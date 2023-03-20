import RadioButtonGroup from "../components/RadioButtonGroup";
import CheckboxGroup from "../components/CheckboxGroup";

/**
 * @param itemName the name of the MenuItem
 * @param name the name of the customization such as "Size"
 * @param type the type of HTML input to generate such as boolean, radiobutton, checkbox, and number
 * @param options optional parameter for radiobutton. Varies depending on input type
 * @param updateHandler reference to the parent's event handler to update React state
 * @param customState the customization state passed down from the parent
 * @constructor
 */
export default function MenuItemCustomization( {itemName, name, type, options, updateHandler, customState}) {

    const handleOptionChange = (event) => {
        if(type === "checkbox") {
            updateHandler(type, name, event.target.id);
        } else {
            updateHandler(type, name, event.target.value);
        }
    }

    const generateInputType = (name, type, options) => {
        if(type === 'boolean') {
            return (
                <label className="boolean-label">
                    {`${name}:`}
                    <input
                        type="checkbox"
                        name={name}
                        defaultChecked={options}
                        onChange={handleOptionChange}
                    />
                </label>
            )
        } else if(type === 'radiobutton') {
            return (
                <div className='radiobutton-holder'>
                    <h6>{`${name}: `}</h6>
                    <RadioButtonGroup
                        itemName={itemName}
                        name={name}
                        options={options}
                        state={customState}
                        onChange={handleOptionChange}
                    />
                </div>
            )
        } else if(type === 'checkbox') {
            //Generate a checkbox
            return (
                <div className='checkboxgroup-holder'>
                    <h6>{`${name}: `}</h6>
                    <CheckboxGroup
                        name={name}
                        options={options}
                        state={customState}
                        onChange={handleOptionChange}
                    />
                </div>
            )

        } else if(type === 'number') {
            return (
                <div className="number-input-holder">
                    <h6>{`${name}: `}</h6>
                    <input
                        className="number-input"
                        type="number"
                        min={options.min}
                        max={options.max}
                        defaultValue={options.min}
                        onChange={handleOptionChange}
                    />
                </div>
            )
        }
    }

    return (
        <div className="menu-customization-holder">
            {generateInputType(name, type, options)}
        </div>
    )
}
