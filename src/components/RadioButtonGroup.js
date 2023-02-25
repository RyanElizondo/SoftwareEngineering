/**
 * Generates a group of radio buttons based on a variable amount of options
 * @param options array of the names of each options
 * @param onChange event function called on change
 * @returns {JSX.Element}
 * @constructor
 */
export default function RadioButtonGroup( {options, selectedOption, onChange} ) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className="radiobutton-options-holder">
            {options.map((option) => (
                <label key={option}>
                    <input
                        type="radio"
                        name="options"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
}