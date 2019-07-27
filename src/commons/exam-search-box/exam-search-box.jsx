import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button} from 'reactstrap';

class ExamSearchBox extends Component {

    render() {
        const {searchKeyword, onChange, onSubmit} = this.props;
        return (
            <Form className="exam-search-box d-flex">
                <Input
                    placeholder="Bạn muốn tìm gì?"
                    className="search-input"
                    value={searchKeyword}
                    onChange={(e) => {onChange({search_keyword: e.target.value})}}
                />
                <Button color="light" type="submit" onClick={(e) => {e.preventDefault(); onSubmit(e)}}>
                    <i className="fa fa-search" />&nbsp;Tìm kiếm
                </Button>
            </Form>
        );
    }

}

ExamSearchBox.propTypes = {
    searchKeyword: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

ExamSearchBox.defaultProps = {
    searchKeyword: '',
};

export default ExamSearchBox;