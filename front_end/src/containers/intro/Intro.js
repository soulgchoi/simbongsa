import React, { useState } from "react";
import ListUp from "components/intro/ListUp";
import { Container } from "semantic-ui-react";
import LinkButton from "components/button/LinkButton";
export default function Intro() {
  return (
    <div>
      <Container>
        <ListUp></ListUp>
      </Container>
    </div>
  );
}
