import React, { ReactElement } from "react";
import "assets/mycss/components.scss";

interface Props {
  value: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.FormEvent<HTMLInputElement>) => void;
  id: string;
  placeholder: string;
  name: string;
  type: string;
}
interface State {}
export default function Input({
  value,
  onChange,
  id,
  placeholder,
  type,
  onEnter,
  name
}: Props): ReactElement {
  return (
    <div>
      <div className="input-with-label">
        <input
          value={value}
          onChange={onChange}
          id={id}
          placeholder={placeholder}
          type={type}
          onKeyDown={event => {
            if (event.key === "Enter" && onEnter !== undefined) {
              onEnter(event);
            }
          }}
        />
        <label htmlFor={id}>{name}</label>
      </div>
    </div>
  );
}
