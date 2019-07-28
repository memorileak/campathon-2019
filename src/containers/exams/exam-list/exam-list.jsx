import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {Row, Col, FormGroup, Button} from 'reactstrap';
import MainContent from "../../../commons/layout/main-content/main-content";
import ExamSearchBox from "../../../commons/exam-search-box/exam-search-box";
import {noti} from "../../../services/noti-service";
import {getPostList} from "../../../api/post-api";
import ExamListItem from "./exam-list-item/exam-list-item";
import LinkWithoutDecoration from "../../../commons/link-without-decoration/link-without-decoration";
import {requireAuthen} from "../../../services/require-authen-service";
import {POST_SORT_ATTRIBUTE} from "../../../constants/post-sort-attributes";
import Pagination from "../../../commons/pagination/pagination";

class ExamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            count: 0,
            search_keyword: '',
            sort_attribute: POST_SORT_ATTRIBUTE.views,
            ascending: false,
            page_size: 6,
            page_number: 0,
        };
        this._handleNewPostClick = this._handleNewPostClick.bind(this);
    };

    componentDidMount() {
        this._getPostList();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevState.sort_attribute !== this.state.sort_attribute
            || prevState.ascending !== this.state.ascending
            || prevState.page_size !== this.state.page_size
            || prevState.page_number !== this.state.page_number
        ) {
            this._getPostList();
        }
    };

    async _getPostList() {
        try {
            const {search_keyword: title, sort_attribute, page_size, page_number, ascending} = this.state;
            const {posts, count} = await getPostList({title, sort_attribute, ascending, page_size, page_number});
            this.setState({posts, count});
        } catch (err) {
            console.error(err);
            noti('error', err);
        }
    };

    _handleNewPostClick() {
        requireAuthen(() => {this.props.history.push('/new-exam')});
    };

    render() {
        const {search_keyword, sort_attribute, ascending, count, page_size, page_number, posts} = this.state;
        return (
            <MainContent className="exam-list">
                <FormGroup row>
                    <Col lg={{size: 8, offset: 2}} md={12} className="d-flex justify-content-end">
                        <Button color="primary" onClick={this._handleNewPostClick}>
                            <i className="fa fa-plus" /> Đóng góp đề thi mới
                        </Button>
                    </Col>
                </FormGroup>
                <Row className="filter">
                    <Col lg={{size: 8, offset: 2}} md={12} className="d-flex">
                        <ExamSearchBox
                            searchKeyword={search_keyword}
                            sortAttribute={sort_attribute}
                            ascending={ascending}
                            pageSize={page_size}
                            onChange={(value) => {this.setState(value)}}
                            onSubmit={this._getPostList.bind(this)}
                        />
                    </Col>
                </Row>
                <div className="list">
                    {
                        posts.map(post => (
                            <LinkWithoutDecoration key={post.id} to={`/exams/${post.id}`}>
                                <ExamListItem examItem={post} />
                            </LinkWithoutDecoration>
                        ))
                    }
                </div>
                <div className="pagination-container text-center">
                    <Pagination
                        onSelectPage={(page_number) => {this.setState({page_number})}}
                        pageCount={Math.ceil(count / page_size)}
                        selectedPage={page_number}
                    />
                </div>
            </MainContent>
        );
    }

}

ExamList.propTypes = {};

export default ExamList;