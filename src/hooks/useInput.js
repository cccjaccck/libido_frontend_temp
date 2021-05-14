import { useState } from "react";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const resetValue = () => {
    setValue("");
  };
  return { value, onChange, resetValue, setValue };
};

export default useInput;
