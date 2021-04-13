const Input = ({
  isDisabled = false,
  isRequired = false,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <label>
      {label}:
      <input
        disabled={isDisabled}
        placeholder={placeholder}
        required={isRequired}
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
