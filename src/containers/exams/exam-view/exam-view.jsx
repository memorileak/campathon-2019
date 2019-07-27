import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import MainContent from "../../../commons/layout/main-content/main-content";
import {safeRetrieve} from "../../../utils/retrieve-value-utils";
import {noti} from "../../../services/noti-service";
import {getPost} from "../../../api/post-api";
import {getDayMonthYearString} from "../../../utils/datetime-utils";
import Image from "../../../commons/image/image";
import CommentItem from "./comment-item/comment-item";
import CommentForm from "./comment-form/comment-form";
import {getCommentsOfPost} from "../../../api/comment-api";

class ExamView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            comment_count: 0,
        };
    };

    componentDidMount() {
        this._getPost();
        this._getCommentsOfPost();
    };

    async _getPost() {
        try {
            const post_id = safeRetrieve(this.props, ['match', 'params', 'exam_id']);
            const {post} = await getPost(post_id);
            this.setState({post});
        } catch (err) {
            console.error(err);
            noti('error', err);
        }
    };

    async _getCommentsOfPost() {
        try {
            const post_id = safeRetrieve(this.props, ['match', 'params', 'exam_id']);
            const {comments, count: comment_count} = await getCommentsOfPost(post_id);
            this.setState({comments, comment_count});
        } catch (err) {
            console.error(err);
            noti('error', err);
        }
    };

    render() {
        const {post, comments} = this.state;
        const attachments = post.attachments || [];
        return (
            <MainContent className="exam-view" title={safeRetrieve(post, ['title']) || ''}>
                <div className="information">
                    <p className="text-secondary">
                        Đăng bởi&nbsp;
                        <a href="#!">{safeRetrieve(post, ['post_by'])}</a>&nbsp;-&nbsp;ngày&nbsp;
                        <span className="text-dark">{getDayMonthYearString(safeRetrieve(post, ['create_time']))}</span>
                    </p>
                </div>
                <div className="attachments bg-white form-group rounded">
                    {
                        attachments.map(src => (
                            <Image key={src} src={src} width="100%" height="auto" />
                        ))
                    }
                </div>
                <div className="control bg-white d-flex form-group rounded">
                    <span className="control-item text-secondary">
                        <i className="fa fa-thumbs-up" />&nbsp;{safeRetrieve(post, ['up_vote']) || 0}
                    </span>
                    <span className="control-item text-secondary">
                        <i className="fa fa-thumbs-down" />&nbsp;{safeRetrieve(post, ['down_vote']) || 0}
                    </span>
                    <span className="control-item no-interact text-secondary">
                        <i className="fa fa-eye" />&nbsp;{safeRetrieve(post, ['views']) || 0}
                    </span>
                </div>
                <div className="comments bg-white rounded">
                    <h5>Bình luận</h5>
                    <CommentForm />
                    {
                        comments.map(comment => <CommentItem key={comment.id} comment={comment} />)
                    }
                </div>
            </MainContent>
        );
    }

}

ExamView.propTypes = {};

export default ExamView;