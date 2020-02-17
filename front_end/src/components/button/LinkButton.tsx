import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
// import "assets/mycss/";
interface Props {
  placeholder: string;
  link: string;
  disabled?: boolean;
}

export default function LinkButton({
  link,
  placeholder,
  disabled
}: Props): ReactElement {
  return (
    <div><Link to={link}>
      <Button color='orange'>
        {placeholder}
      </Button>
    </Link>
    </div>
  );
}
