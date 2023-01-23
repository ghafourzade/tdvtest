import { useCallback, useEffect, useState } from "react";

const useField = (defaultValue, validationFunc) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : "");
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const onChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  useEffect(() => {
    if (validationFunc) {
      setValid(validationFunc(value));
    }
  }, [value]);

  return { value, setValue, valid, touched, setTouched, onChange, props: { value, valid, touched, onChange } };
};

export default useField;
