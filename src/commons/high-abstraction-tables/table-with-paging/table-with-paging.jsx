import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TableWithItemPatternAndHeadConfig from "../../table-with-item-pattern-and-header-config/table-with-item-pattern-and-head-config";
import Pagination from "../../pagination/pagination";
import {FormGroup, Button} from "reactstrap";
import SelectResultsPerPage from "../../select-results-per-page/select-results-per-page";
import SelPulseLoader from "../../sel-loaders/sel-pulse-loader";

class TableWithPaging extends Component {

    render() {
        const {className, isLoading, tableProps, pagingProps, onColumnsConfigButtonClick} = this.props;
        const {configRegisterName, headConfig, items, itemPattern, itemKeyGen, itemProps, customHead, ...otherTableProps} = tableProps;
        const {totalCount, pageSize, currentPage, onChangePageSize, onSelectPage} = pagingProps;
        return (
            <div className={`table-with-paging ${className}`}>
                <FormGroup className="twp-paging d-flex align-items-center justify-content-end">
                    {
                        configRegisterName
                            ? <Fragment>
                                <Button outline onClick={onColumnsConfigButtonClick}>
                                    <i className="fa fa-cog" />
                                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            </Fragment>
                            : null
                    }
                    <div className="d-flex align-items-center">
                        Showing&nbsp;&nbsp;
                        <SelectResultsPerPage
                            value={pageSize}
                            onChange={onChangePageSize}
                        />
                        &nbsp;&nbsp;results in a page
                    </div>
                </FormGroup>
                <TableWithItemPatternAndHeadConfig
                    {...otherTableProps}
                    className="twp-table"
                    headConfig={headConfig}
                    items={items}
                    itemPattern={itemPattern}
                    itemKeyGen={itemKeyGen}
                    itemProps={itemProps}
                    customHead={customHead}
                />
                <SelPulseLoader
                    className="twp-loader text-center"
                    loading={isLoading}
                    delayTime={2000}
                    sizeUnit="px"
                    size={10}
                    color="#6c757d"
                />
                <Pagination
                    onSelectPage={onSelectPage}
                    pageCount={Math.ceil(totalCount / pageSize)}
                    selectedPage={currentPage}
                />
            </div>
        );
    };

}

TableWithPaging.propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    tableProps: PropTypes.object.isRequired,
    pagingProps: PropTypes.object.isRequired,
    onColumnsConfigButtonClick: PropTypes.func.isRequired,
};

TableWithPaging.defaultProps = {
    onColumnsConfigButtonClick: () => {},
};

export default TableWithPaging;