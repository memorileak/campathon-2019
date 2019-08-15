import React, {useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';

export default function Image({src, centerCrop, link, className, alt, width, height}) {

    const memo = useMemo(() => ({}), []);
    const style = {width, height};
    const [portrait, setPortrait] = useState(true);
    useEffect(() => {
        if (centerCrop) {
            memo.image.onload = () => {
                setPortrait((memo.image.height > memo.image.width))
            };
        }
    }, []);

    if (centerCrop) {
        return link
            ? <a href={src} target="_blank" rel="noopener noreferrer">
                <div style={style} className="center-cropped">
                    <img
                        className={className + (portrait ? " portrait-image" : " landscape-image")}
                        src={src} alt={alt} ref={el => {memo.image = el}}
                    />
                </div>
            </a>
            : <div style={style} className="center-cropped">
                <img
                    className={className + (portrait ? " portrait-image" : " landscape-image")}
                    src={src} alt={alt} ref={el => {memo.image = el}}
                />
            </div> ;
    } else {
        return link
            ? <a href={src} target="_blank" rel="noopener noreferrer">
                <img style={style} className={className} src={src} alt={alt} />
            </a>
            : <img style={style} className={className} src={src} alt={alt} /> ;
    }


};

Image.propTypes = {
    centerCrop: PropTypes.bool,
    link: PropTypes.bool,
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Image.defaultProps = {
    alt: "broken"
};
