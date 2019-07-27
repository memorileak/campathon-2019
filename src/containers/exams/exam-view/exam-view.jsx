import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import MainContent from "../../../commons/layout/main-content/main-content";
import {safeRetrieve} from "../../../utils/retrieve-value-utils";
import {noti} from "../../../services/noti-service";
import {checkVoteStatus, getPost, votePost} from "../../../api/post-api";
import {getDayMonthYearString} from "../../../utils/datetime-utils";
import Image from "../../../commons/image/image";
import CommentItem from "./comment-item/comment-item";
import CommentForm from "./comment-form/comment-form";
import {getCommentsOfPost} from "../../../api/comment-api";
import {VOTE_TYPES} from "../../../constants/vote-types";
import AuthenService from '../../../services/authen-service';
import {requireAuthen} from "../../../services/require-authen-service";

class ExamView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            comment_count: 0,
            vote_type: VOTE_TYPES.none,
        };
    };

    componentDidMount() {
        AuthenService.register('ExamView', this.forceUpdate.bind(this));
        this._getPost();
        this._getCommentsOfPost();
        if (AuthenService.getUserInfo()) this._checkVoteStatus();
    };

    componentWillUnmount() {
        AuthenService.unregister('ExamView');
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

    _checkVoteStatus() {
        requireAuthen(async () => {
            try {
                const post_id = safeRetrieve(this.props, ['match', 'params', 'exam_id']);
                const {vote_type} = await checkVoteStatus(post_id);
                this.setState({vote_type});
            } catch (err) {
                console.error(err);
                noti('error', err);
            }
        });
    };

    async _votePost(new_vote_type) {
        requireAuthen(async () => {
            try {
                const post_id = safeRetrieve(this.props, ['match', 'params', 'exam_id']);
                const {vote_type: current_vote_type} = this.state;
                const vote_type = (current_vote_type === new_vote_type) ? VOTE_TYPES.none : new_vote_type;
                const {vote_infor} = await votePost(post_id, {vote_type});
                const {up_vote, down_vote} = vote_infor;
                this.setState({post: {...this.state.post, up_vote, down_vote}});
                this._checkVoteStatus();
            } catch (err) {
                console.error(err);
                noti('error', err);
            }
        });
    };

    render() {
        const {post, comments, vote_type} = this.state;
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
                    <span
                        className={`control-item ${vote_type === VOTE_TYPES.up ? 'text-primary' : 'text-secondary'}`}
                        onClick={() => {this._votePost(VOTE_TYPES.up)}}
                    >
                        <i className="fa fa-thumbs-up" />&nbsp;{safeRetrieve(post, ['up_vote']) || 0}
                    </span>
                    <span
                        className={`control-item ${vote_type === VOTE_TYPES.down ? 'text-danger' : 'text-secondary'}`}
                        onClick={() => {this._votePost(VOTE_TYPES.down)}}
                    >
                        <i className="fa fa-thumbs-down" />&nbsp;{safeRetrieve(post, ['down_vote']) || 0}
                    </span>
                    <span className="control-item no-interact text-secondary">
                        <i className="fa fa-eye" />&nbsp;{safeRetrieve(post, ['views']) || 0}
                    </span>
                </div>
                <div className="comments bg-white rounded">
                    <h5>Bình luận</h5>
                    {
                        AuthenService.getUserInfo() ? <CommentForm /> : null
                    }
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