import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "assets/mycss/";
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
    <div id="btn-div">
      <Link to={link} className="my--btn">
        <button>{placeholder}</button>
      </Link>
    </div>
  );
}
