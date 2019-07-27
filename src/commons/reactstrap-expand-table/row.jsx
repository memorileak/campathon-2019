import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class Row extends Component {

    state = {
        isExpand: false
    };

    renderExpandRow = () => {

        const { colSpanSize, row } = this.props;
        const { isExpand } = this.state;
        return isExpand ? (
            <tr>
                <td colSpan={colSpanSize}>
                    {
                        this.props.expand(row)
                    }
                </td>
            </tr>
        ) : null
    };

    renderRow = () => {
        const { row, columns } = this.props;
        return !!row ?
            (
                <React.Fragment>
                    {
                        !!columns ? (columns.map((e, index) => {
                            return <td key={index}>{row[e.dataField]}</td>
                        })) : null
                    }
                </React.Fragment>
            ) : null;
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    {
                        this.renderRow()
                    }
                    <th scope="row" onClick={(e) => {
                        this.setState({
                            isExpand: !this.state.isExpand
                        });
                    }}>
                        <Button color="info" id="carts-fa-search-plus">
                            Detail
                        </Button>
                    </th>
                </tr>
                {
                    this.renderExpandRow()
                }
            </React.Fragment>
        )
    }
}


Row.propTypes = {
    row: PropTypes.object,
    expand: PropTypes.func,
    columns: PropTypes.array,
};


export default Row;
