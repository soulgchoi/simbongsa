import React, { ReactElement, Fragment } from "react";
import { Form, Button } from 'semantic-ui-react'
// import "assets/mycss";

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
    <Fragment>
      <Form>
        <Form.Field>
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
        </Form.Field>
      </Form>
      <Button color='orange' type='submit' onClick={handleSubmit}>검색</Button>
    </Fragment>
  );
}
