import React from "react";

import styles from "./InputControl.module.scss";

interface InputControlProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  name: string;
}

export default function InputControl({
  name,
  label,
  ...inputProps
}: InputControlProps) {
  const id = inputProps.id || `input-${name}`;
  return (
    <div className={styles.inputControl}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} {...inputProps} />
    </div>
  );
}
