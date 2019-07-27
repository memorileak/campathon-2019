import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Row from './row';
import PropTypes from 'prop-types';


class HoverTable extends Component {


    renderRows = () => {
        const { rows, columns } = this.props;

        return !!rows ? rows.map((row, index) => (
            <Row
                key={index}
                expand={this.props.expandHoverRow}
                row={row}
                colSpanSize={!!columns ? columns.length + 1 : 1}
                columns={columns}
            >
            </Row>
        )
        ) : null
    }

    renderHeader = () => {
        const { columns } = this.props;
        return !!columns ? columns.map((e, index) => (<th key={index}>{e.text}</th>)) : null;
    }

    render() {
        return (
            <Table striped bordered>
                <thead>
                    <tr>
                        {this.renderHeader()}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.renderRows()
                    }
                </tbody>
            </Table>
        )
    }
}


HoverTable.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
    expandHoverRow: PropTypes.func
}

export default HoverTable;