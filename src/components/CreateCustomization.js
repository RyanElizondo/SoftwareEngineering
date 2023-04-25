import CreateCustomizationOptions from "@/components/CreateCustomizationOptions";

const getInitialOptions = (type) => {
    if(type === "Number") return {min: 0, max: 5}
    else if(type === "Boolean") return false;
    else if(type === "Checkbox" || type === "Radio button")  return ["", ""];
}

export default function CreateCustomization({updateHandler, customizationState, index }) {
    const handleChange = (optionName, value) => {
        // update default customization options
        if(optionName === "type") {
            const newOptions = getInitialOptions(value);
            const newCustom = {...customizationState, options: newOptions, type: value};
            updateHandler(newCustom, index);
        } else {
            const newCustom = {...customizationState, [optionName]: value}
            updateHandler(newCustom, index);
        }
    }

    return (
        <div className="create-customization">
            <div className="customization-input-holder">
                <label>
                    Customization Name:
                    <input
                        type="text"
                        value={customizationState.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Customization name"
                    />
                </label>
            </div>
            <div className="customization-input-holder">
                <label >
                    Customization Type:
                    <label>
                        <input
                            type="radio"
                            name={`customization-type${index}`}
                            value="Radio button"
                            checked={customizationState.type === "Radio button"}
                            onChange={() => handleChange("type", "Radio button")}
                        />
                        Radio button
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`customization-type${index}`}
                            value="Checkbox"
                            checked={customizationState.type === "Checkbox"}
                            onChange={() => handleChange("type", "Checkbox")}
                        />
                        Checkbox
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`customization-type${index}`}
                            value="Number"
                            checked={customizationState.type === "Number"}
                            onChange={() => handleChange("type", "Number")}
                        />
                        Number
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`customization-type${index}`}
                            value="what is value"
                            checked={customizationState.type === "Boolean"}
                            onChange={() => handleChange("type", "Boolean")}
                        />
                        Boolean
                    </label>
                </label>
            </div>
            <div className="customization-input-holder">
                <div className="customizations-options-creator">
                    <label>
                        Customization options:
                        <CreateCustomizationOptions
                            customizationState={customizationState}
                            updateHandler={handleChange}
                        />
                    </label>

                </div>
            </div>
        </div>
    )
}