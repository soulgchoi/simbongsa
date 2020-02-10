import React, { ReactElement } from "react";
import "assets/mycss";
interface Props {
  placeholder: string;
  // disabled : boolean
  action: () => void;
}
interface State {}

export default function ActionButton({
  action,
  // disabled,
  placeholder
}: Props): ReactElement {
  return (
    <div id="btn-div">
      {/* <button className="my--btn" onClick={action} disabled={disabled}> */}
      <button className="my--btn" onClick={action}>
        {placeholder}
      </button>
    </div>
  );
}
