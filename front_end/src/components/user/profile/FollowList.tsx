import React, { ReactElement } from "react";

interface Props {
  list: [];
}

export default function FollowList({ list }: Props): ReactElement {
  return <div>{list}</div>;
}
