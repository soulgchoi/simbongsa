import React, { ReactElement } from "react";

interface Props {
  list: string[];
}

export default function FollowList({ list }: Props): ReactElement {
  return <div>{list}</div>;
}
