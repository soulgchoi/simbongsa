import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import React from "react";
import { Divider } from "semantic-ui-react";
import DotGroup from "./DotGroup";
import CardSlide from "./CardSlide";

interface Props {
    files: [];
}


class ImageCarousel extends React.Component<Props, {}> {
    render() {
        const images = this.props.files.map( (file, i:number ) => {
            console.log(file)
            return (
                <Slide index={i}>
                    <Image src={"http://i02a205.p.ssafy.io:8080/A205/uploads/" + file}
                        hasMasterSpinner={true}
                    />  
                </Slide>
            )
        })

        return (
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={125}
                totalSlides={this.props.files.length}
            >
                <Slider>
                    {images}
                </Slider>

                <Divider />
                <DotGroup slides={this.props.files.length} />
            </CarouselProvider>
        )
    }
}
export default ImageCarousel;
