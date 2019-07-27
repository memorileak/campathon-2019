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

class ExamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            count: 0,
            search_keyword: '',
        };
        this._handleNewPostClick = this._handleNewPostClick.bind(this);
    };

    componentDidMount() {
        this._getPostList();
    };

    async _getPostList() {
        try {
            const {posts, count} = await getPostList();
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
        const {search_keyword, posts} = this.state;
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
                            onChange={(value) => {this.setState(value)}}
                            onSubmit={() => {console.log(search_keyword)}}
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
            </MainContent>
        );
    }

}

ExamList.propTypes = {};

export default ExamList;