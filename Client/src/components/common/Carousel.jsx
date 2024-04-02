import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "../../Global.css"

const CommonCarousel = ({ children }) => {
    return (
        <Carousel>
            {React.Children.map(children, (child, index) => (
                <Carousel.Item key={index}>
                    {child}
                    <Carousel.Caption>
                        {/* <h3>{`Slide ${index + 1} label`}</h3> */}
                        {/* You may customize caption content as needed */}
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CommonCarousel;