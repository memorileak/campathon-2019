import React from 'react';
import {Link} from 'react-router-dom';

function LinkWithoutDecoration(props) {

    const style = {
        textDecoration: 'none',
        color: 'inherit',
    };
    return (
        <Link style={style} {...props} />
    );

}

LinkWithoutDecoration.propTypes = {
    ...Link.propTypes,
};

export default LinkWithoutDecoration;