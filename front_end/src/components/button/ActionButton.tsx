import React, { ReactElement } from "react";
import { Button } from "semantic-ui-react";
// import "assets/mycss";
interface Props {
  placeholder?: string;
  // disabled : boolean
  action: (event: any) => void;
}
interface State { }

export default function ActionButton({
  placeholder,
  action
}: // disabled,
  Props): ReactElement {
  return (
    <div>
      {/* <button className="my--btn" onClick={action} disabled={disabled}> */}
      <Button color="orange" onClick={action}>
        {placeholder}
      </Button>
    </div>
  );
}
