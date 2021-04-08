import { useState } from "react";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return { value, onChange };
};

export default useInput;
