import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators} from 'reactstrap';

/**
 * @return {null}
 */
function FullscreenCarousel({isOpen, toggle, initialIndex, images}) {

    function previous() {
        setIndex((index + images.length - 1) % images.length);
    }

    function next() {
        setIndex((index + 1) % images.length);
    }

    const [index, setIndex] = useState(initialIndex || 0);
    useEffect(() => {
        if (isOpen) setIndex(initialIndex || 0)
    }, [isOpen]);

    return isOpen
        ? <div className="fullscreen-carousel">
            <i className="fa fa-times" onClick={toggle} />
            <div className="carousel-presentation d-flex align-items-stretch">
                <Carousel interval={false} activeIndex={index} next={next} previous={previous} className="flex-grow-1">
                    <CarouselIndicators items={images} activeIndex={index} onClickHandler={(new_index) => {setIndex(new_index)}} />
                    {
                        images.map(img => (
                            <CarouselItem key={img} className="text-center full-height">
                                <img src={img}  alt="fullscreen-carousel"/>
                            </CarouselItem>
                        ))
                    }
                    <CarouselControl direction="prev" onClickHandler={previous} />
                    <CarouselControl direction="next" onClickHandler={next} />
                </Carousel>
            </div>
        </div>
        : null;

}


FullscreenCarousel.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    initialIndex: PropTypes.number,
    images: PropTypes.array.isRequired,
};

FullscreenCarousel.defaultProps = {
    initialIndex: 0,
};

export default FullscreenCarousel;