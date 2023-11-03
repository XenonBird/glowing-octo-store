function InputField({
  name,
  type,
  value,
  changeHandler,
  label,
  required,
  readonly = false,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={changeHandler}
        readOnly={readonly}
        required={required}
        className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300 sm:text-sm"
      />
    </div>
  );
}

export default InputField;
