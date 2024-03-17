import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event !== undefined ? event.target.value : "");
  };

  return {
    name,
    value,
    onChange,
  };
};
