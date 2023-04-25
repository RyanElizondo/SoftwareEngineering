/**
 * Renders a
 * @param customizationState
 * @param updateHandler
 * @returns {JSX.Element|*}
 * @constructor
 */
export default function CreateCustomizationOptions({customizationState, updateHandler}) {

    const onAddNewOption = () => {
        if(customizationState.type === "Boolean" || customizationState.type === "Number") return;
        //customizationState.options.push(optionValue)
        updateHandler("options", [...customizationState.options, `Option #${customizationState.options.length+1} Name`])
    }

    const onRemoveOption = () => {
        if(customizationState.type === "Boolean" || customizationState.type === "Number") return;
        //customizationState.options.push(optionValue)
        const newOptions = customizationState.options.slice(0, customizationState.options.length - 1);
        updateHandler("options", newOptions)
    }

    const handleChange = (optionName, value) => {
        if(customizationState.type === "boolean" && optionName === "options") {
            //convert strings to booleans
            if(value === "false") value = false;
            else if(value === "true") value = true;
        }
        const newCustom = {...customizationState, [optionName]: value}
        updateHandler("options", value);
    }

    const handleNumberChange = (isMin, value) => {
        const newOptions = isMin ?
            {min: value, max: customizationState.options.max} : {min: customizationState.options.min, max: value}
        updateHandler("options", newOptions)
    }

    const handleOptionArrayChange = (value, index) => {
        const newOptions = customizationState.options.map( (option, i) => i === index ? value : option  )
        const newCustom = {...customizationState, options: newOptions}
        updateHandler("options", newOptions);
    }

    //Works for checkbox and radio button inputs
    const renderOptionsArray = () => {
        return (
            <div className="options-holder" id="radio">
                <ul className="options-list">
                    {customizationState.options.map( (option, i) => (
                        <input
                            type="text"
                            key={i}
                            value={customizationState.options[i]}
                            onChange={(e) => handleOptionArrayChange(e.target.value, i) }
                            placeholder={`Option #${i}`}
                        />
                    ))}
                </ul>
                <label className="customization-input">
                    <button onClick={onAddNewOption}>
                        Add New Option
                    </button>
                    <button onClick={onRemoveOption}>
                        Remove Previous Option
                    </button>
                </label>
            </div>
        )
    }

    const renderBoolean = () => {
        return (
            <div className="options-holder" id="boolean">
                <label className="customization-input">
                    Default value
                    <input
                        type="checkbox"
                        value={customizationState.options}
                        onChange={(e) => handleChange("options", e.target.checked)}
                    />
                </label>
            </div>
        )
    }

    const renderNumber = () => {
        return (
            <div className="options-holder" id="number">
                <label className="customization-input">
                    Min:
                    <input
                        type="number"
                        value={customizationState.options.min}
                        min="0"
                        onChange={(e) => handleNumberChange(true, e.target.value)}
                    />
                </label>
                <label className="customization-input">
                    Max:
                    <input
                        type="number"
                        value={customizationState.options.max}
                        min="0"
                        onChange={(e) => handleNumberChange(false, e.target.value)}
                    />
                </label>
            </div>
        )
    }

    let initialState = null;

    const renderOptions = (optionType) => {
        if(optionType === "Radio button") {
            initialState = [];
        } else if(optionType === "Checkbox") {
            initialState = [];
        } else if(optionType === "Number") {
            initialState = {min: 0, max: 5}
        } else if(optionType === "Boolean") {
            initialState = false;
        }
    }
    
    if(customizationState.type === "Radio button") {
        return renderOptionsArray();
    } else if (customizationState.type === "Number") {
        return renderNumber();
    } else if (customizationState.type === "Boolean") {
        return renderBoolean();
    } else if (customizationState.type === "Checkbox") {
        return renderOptionsArray();
    }

    return (
        <div className="customization-options-holder">
            <p>{`Options type not found for ${customizationState.type}`}</p>
        </div>
    )
}