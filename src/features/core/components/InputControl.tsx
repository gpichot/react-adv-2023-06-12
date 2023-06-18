import React from "react";

import styles from "./InputControl.module.scss";

interface InputControlProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  name: string;
}

const InputControl = React.forwardRef(
  (
    { name, label, ...inputProps }: InputControlProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const id = inputProps.id || `input-${name}`;
    return (
      <div className={styles.inputControl}>
        <label htmlFor={id}>{label}</label>
        <input ref={ref} id={id} name={name} {...inputProps} />
      </div>
    );
  }
);
InputControl.displayName = "InputControl";

export default InputControl;
