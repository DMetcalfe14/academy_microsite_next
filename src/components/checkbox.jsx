const Checkbox = ({ label, checked, onChange }) => {
    const id = label.toLowerCase().replace(/\s+/g, '_');

    return (
        <div className="flex items-center mb-2">
            <input
                id={id}
                type="checkbox"
                className="h-4 w-4 accent-primary border-gray-300 rounded focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                checked={checked}
                onChange={onChange}
                aria-checked={checked} // Explicitly indicate the checked state for screen readers
            />
            <label
                htmlFor={id}
                className="ml-3 text-sm text-gray-900"
            >
                {label}
            </label>
        </div>
    );
};

export default Checkbox;