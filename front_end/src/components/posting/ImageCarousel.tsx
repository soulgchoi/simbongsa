import { CarouselProvider, Slider } from "pure-react-carousel";
import React from "react";
import DotGroup from "./DotGroup";
import "./ImageCarousel.css";

interface Props {
  files: [];
}

class ImageCarousel extends React.Component<Props, {}> {
  render() {
    const images = this.props.files.map((file, i: number) => {
      return (
        <div></div>
      );
    });

    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={this.props.files.length}
      >
        <Slider>{images}</Slider>
        <DotGroup slides={this.props.files.length} size="15px" />
      </CarouselProvider>
    );
  }
}
export default ImageCarousel;
