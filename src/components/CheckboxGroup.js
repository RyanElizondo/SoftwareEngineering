/**
 * Generates a group of check boxes based on a variable amount of options
 * @param options array of the names of each options
 * @param onChange event function called on change
 * @returns {JSX.Element}
 * @constructor
 */
export default function CheckboxGroup( {name, options, state, onChange} ) {

    const handleChange = (event) => {
        onChange(event);
    };

    return (
        <div className="checkbox-options-holder">
            {options.map((option) => (
                <label className="checkbox-option-label" key={option}>
                    <input
                        type="checkbox"
                        name={name}
                        id={option}
                        checked={state[option]}
                        onChange={handleChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
}