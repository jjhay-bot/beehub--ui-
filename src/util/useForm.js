import { useState } from "react";
import { snakeCase } from "lodash";

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const onChange = ({ target: { name, value } }) =>
    setFormData({ ...formData, [snakeCase(name)]: value });

  return { formData, onChange };
};
