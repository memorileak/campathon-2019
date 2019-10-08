import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, FormGroup, Col} from 'reactstrap';
import {POST_SORT_ATTRIBUTE} from "../../constants/post-sort-attributes";

class ExamSearchBox extends Component {

    render() {
        const {searchKeyword, sortAttribute, ascending, pageSize, onChange, onSubmit} = this.props;
        return (
            <Form className="exam-search-box">
                <FormGroup className="d-flex">
                    <Input
                        placeholder="Bạn muốn tìm gì?"
                        className="search-input"
                        value={searchKeyword}
                        onChange={(e) => {onChange({search_keyword: e.target.value})}}
                    />
                    <Button color="light" type="submit" onClick={(e) => {e.preventDefault(); onSubmit(e)}}>
                        <i className="fa fa-search" />&nbsp;Tìm kiếm
                    </Button>
                </FormGroup>
                <FormGroup row>
                    <Col lg={8} md={12} className="sort-filter d-flex align-items-center">
                        <span>Sắp xếp theo</span>
                        <Input
                            type="select" className="sort-attribute"
                            value={sortAttribute}
                            onChange={(e) => {onChange({sort_attribute: e.target.value})}}
                        >
                            <option value={POST_SORT_ATTRIBUTE.views}>Lượt xem</option>
                            <option value={POST_SORT_ATTRIBUTE.create_time}>Ngày đăng</option>
                            <option value={POST_SORT_ATTRIBUTE.up_vote}>Đánh giá tốt</option>
                            <option value={POST_SORT_ATTRIBUTE.down_vote}>Đánh giá không tốt</option>
                        </Input>
                        <Input
                            type="select"
                            value={ascending ? '1' : '0'}
                            onChange={(e) => {onChange({ascending: e.target.value === '1'})}}
                        >
                            <option value="0">Giảm dần</option>
                            <option value="1">Tăng dần</option>
                        </Input>
                    </Col>
                    <Col lg={4} md={12} className="page-size-filter d-flex align-items-center">
                        <span>Số kết quả mỗi trang</span>
                        <Input
                            type="select" className="fit-input"
                            value={pageSize}
                            onChange={(e) => {onChange({page_size: e.target.value})}}
                        >
                            <option value={6}>6</option>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={48}>48</option>
                            <option value={96}>96</option>
                            <option value={192}>192</option>
                        </Input>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

}

ExamSearchBox.propTypes = {
    searchKeyword: PropTypes.string.isRequired,
    sortAttribute: PropTypes.oneOf([
        POST_SORT_ATTRIBUTE.views,
        POST_SORT_ATTRIBUTE.create_time,
        POST_SORT_ATTRIBUTE.up_vote,
        POST_SORT_ATTRIBUTE.down_vote,
    ]).isRequired,
    ascending: PropTypes.bool.isRequired,
    pageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

ExamSearchBox.defaultProps = {
    searchKeyword: '',
};

export default ExamSearchBox;