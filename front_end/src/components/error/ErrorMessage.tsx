import React, { ReactElement } from "react";
interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props): ReactElement {
  return (
    <div className="error-text" v-if={message}>
      {message}
    </div>
  );
}
