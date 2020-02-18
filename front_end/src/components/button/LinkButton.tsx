import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
// import "assets/mycss/";
interface Props {
  placeholder: string;
  link: string;
  disabled?: boolean;
  width?: number;
  height?: number;
}

export default function LinkButton({
  link,
  placeholder,
  disabled,
  width,
  height
}: Props): ReactElement {
  return (
    <div>
      <Link to={link}>
        <Button color="orange" width={width} height={height}>
          {placeholder}
        </Button>
      </Link>
    </div>
  );
}
