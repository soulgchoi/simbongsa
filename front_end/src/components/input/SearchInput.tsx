import React, { ReactElement } from "react";

interface Props {
  value: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.FormEvent<HTMLInputElement>) => void;
  id: string;
  placeholder: string;
  nametag?: string;
  type: string;
}
export default function Input({
  value,
  onChange,
  id,
  placeholder,
  type,
  onEnter,
}: Props): ReactElement {
  return (
    <div>
      <div className="input-with-label" id={id}>
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
      </div>
    </div>
  );
}
