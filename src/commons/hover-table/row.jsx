import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Row extends Component {

    state = {
        isExpand: false
    }

    renderExpandRow = () => {
        const { colSpanSize, row } = this.props;
        const { isExpand } = this.state;
        return !!isExpand ? (
            <tr
                onMouseEnter={(e) => {
                    this.setState({
                        isExpand: true
                    })
                }}

                onMouseLeave={(e) => {
                    this.setState({
                        isExpand: false
                    })
                }}
            >
                <td colSpan={colSpanSize}>
                    {
                        this.props.expand(row)
                    }
                </td>
            </tr>
        ) : null
    }

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
                <tr
                    onMouseEnter={(e) => {
                        this.setState({
                            isExpand: true
                        })
                    }}
                    onMouseLeave={(e) => {
                        this.setState({
                            isExpand: false
                        })
                    }}

                >
                    {
                        this.renderRow()
                    }
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
    rowExpanded: PropTypes.func,
    rowExitExpanded: PropTypes.func,
}


export default Row;
