import RadioButtonGroup from "@/components/RadioButtonGroup";
import CheckboxGroup from "@/components/CheckboxGroup";
import {useState} from "react";

/**
 *
 * @param name the name of the customization such as "Size"
 * @param type the type of HTML input to generate such as boolean, radiobutton, checkbox, and number
 * @param options optional parameter for radiobutton. Varies depending on input type
 * @constructor
 */
export default function MenuItemCustomization( {name, type, options}) {
    const [selectedOption, setSelectedOption] = useState(options[0])

    const handleOptionChange = (value) => {
        setSelectedOption(value)
    }

    const generateInputType = (name, type, options) => {
        if(type === 'boolean') {
            return (
                <label className="boolean-label">
                    {`${name}:`}<input type="checkbox" name={`${name}Input`} defaultChecked={options}/>
                </label>
            )
        } else if(type === 'radiobutton') {
            return (
                <div className='radiobutton-holder'>
                    <h6>{`${name}: `}</h6>
                    <RadioButtonGroup
                        name={name}
                        options={options}
                        selectedOption={options[0]}
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
                        onChange={handleOptionChange}
                    />
                </div>
            )

        } else if(type === 'number') {
            //Generator a number input for users to select integers between options.min and options.max

        }
    }

    return (
        <div className="menu-customization-holder">
            <h5 className="customization-title">{name}</h5>
            {generateInputType(name, type, options)}
        </div>
    )
}
