import React, { ReactElement } from "react";
import "assets/mycss/components.scss";
interface Props {
  placeholder: string;
  action: () => void;
  disabled: boolean;
}
interface State {}

export default function ActionButton({
  action,
  disabled,
  placeholder
}: Props): ReactElement {
  return (
    <div>
      <button className="my--btn" onClick={action} disabled={disabled}>
        {placeholder}
      </button>
    </div>
  );
}
