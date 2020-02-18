import PropTypes from "prop-types";
import { Slide } from "pure-react-carousel";
import React from "react";
import { Card } from "semantic-ui-react";


const CardSlide = (index:number, image:string) => (
  <Slide index={index}>
    <div style={{ padding: 10 }}>
      <Card fluid img={image} />
    </div>
  </Slide>
);

CardSlide.propTypes = {
  index: PropTypes.number.isRequired
};

export default CardSlide;