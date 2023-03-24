/**
 * Generates a group of radio buttons based on a variable amount of options
 * @param options array of the names of each options
 * @param onChange event function called on change
 * @returns {JSX.Element}
 * @constructor
 */
export default function RadioButtonGroup( {itemName, name, options, state, onChange} ) {

    const handleChange = (event) => {
        onChange(event);
    };

    return (
        <div className="radiobutton-options-holder">
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name={`${itemName}${name}`}
                        value={option}
                        checked={state === option}
                        onChange={handleChange}
                        key={index}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
}