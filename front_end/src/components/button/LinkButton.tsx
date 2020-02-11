import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import "assets/mycss/components.scss";


=======
import "assets/mycss/";
>>>>>>> ca2c51cf04e81e9795f14d38caa6eac539332395
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
