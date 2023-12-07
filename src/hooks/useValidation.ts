import React, { useCallback, useState, ChangeEvent } from "react";

interface ValidationHookProps {
  [key: string]: string;
}

interface UseValidationProps {
  formClass: string;
}

interface UseValidationReturn {
  values: ValidationHookProps;
  errors: ValidationHookProps;
  isDisabled: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: (
    blankValues?: ValidationHookProps,
    blankErrors?: ValidationHookProps,
    defaultDisabled?: boolean
  ) => void;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setValues: React.Dispatch<React.SetStateAction<ValidationHookProps>>;
}

export default function useValidation({
  formClass,
}: UseValidationProps): UseValidationReturn {
  const [values, setValues] = useState<ValidationHookProps>({});
  const [errors, setErrors] = useState<ValidationHookProps>({});
  const [isDisabled, setIsDisabled] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const name: string = e.target.name;
    const value: string | boolean = e.target.value;
    const eventTarget: EventTarget & HTMLInputElement = e.target;
    const message: string = eventTarget.validationMessage;
    const closestForm: HTMLInputElement | null = eventTarget.closest(
      `.${formClass}`
    );

    if (closestForm !== null) {
      setValues({ ...values, [name]: value });
      setErrors({
        ...errors,
        [name]: message,
      });
      if (eventTarget.validity.patternMismatch) {
        setErrors({ ...errors, [name]: eventTarget.title });
      }

      setIsDisabled(closestForm.checkValidity());
    }
  }

  const resetForm = useCallback(
    (
      blankValues: ValidationHookProps = {},
      blankErrors: ValidationHookProps = {},
      defaultDisabled = false
    ) => {
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
