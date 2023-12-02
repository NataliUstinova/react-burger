import { useCallback, useState } from "react";

export default function useValidation(formClass) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const eventTarget = e.target;
    const message = eventTarget.validationMessage;
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: message,
    });
    if (eventTarget.validity.patternMismatch) {
      setErrors({ ...errors, [name]: eventTarget.title });
    }

    setIsDisabled(eventTarget.closest(formClass).checkValidity());
  }

  const resetForm = useCallback(
    (blankValues = {}, blankErrors = {}, defaultDisabled = false) => {
      setValues(blankValues);
      setErrors(blankErrors);
      setIsDisabled(defaultDisabled);
    },
    [setValues, setErrors, setIsDisabled]
  );

  return {
    values,
    errors,
    isDisabled,
    handleInputChange,
    resetForm,
    setIsDisabled,
    setValues,
  };
}
