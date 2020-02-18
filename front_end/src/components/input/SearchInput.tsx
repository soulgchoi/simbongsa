import React, { ReactElement } from "react";
import { Input, Button } from 'semantic-ui-react'
interface Props {
  value: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.FormEvent<HTMLInputElement>) => void;
  id: string;
  placeholder: string;
  nametag?: string;
  type: string;

  handleSubmit: any
}
export default function SearchInput({
  value,
  onChange,
  id,
  placeholder,
  type,
  onEnter,

  handleSubmit
}: Props): ReactElement {
  return (
    <div>

      <Input
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        type={type}

        onKeyDown={(event: any) => {
          if (event.key === "Enter" && onEnter !== undefined) {
            onEnter(event);
          }
        }}

      />
      <Button color='orange' type='submit' onClick={handleSubmit}>검색</Button>
    </div>
  );
}
