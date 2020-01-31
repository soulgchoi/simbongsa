import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "assets/mycss/components.scss";
interface Props {
  placeholder: string;
  link: string;
  disabled?: boolean;
}

export default function LinkButton({ link, placeholder }: Props): ReactElement {
  return (
    <Link to={link} className="my--btn">
      {placeholder}
    </Link>
  );
}
