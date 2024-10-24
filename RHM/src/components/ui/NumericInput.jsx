import { Input } from "antd";

const NumericInput = (props) => {
  const { value, onChange } = props;

  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^[0-9\b]+$/; 

    
    if (reg.test(inputValue) || inputValue === "") {
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    let valueTemp = value;

    
    valueTemp = valueTemp.replace(/^0+(?!$)/, "");
    onChange(valueTemp);
  };

  return (
    <Input
    className="font-thin"
      {...props}
      variant="borderless"
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Input a number"
      maxLength={16}
      value={value}
    />
  );
};

export default NumericInput;
