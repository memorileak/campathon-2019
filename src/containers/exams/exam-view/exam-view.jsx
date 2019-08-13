import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MainContent from "../../../commons/layout/main-content/main-content";
import {safeRetrieve} from "../../../utils/retrieve-value-utils";
import {noti} from "../../../services/noti-service";
import {checkVoteStatus, confirmPost, getPost, votePost} from "../../../api/post-api";
import {getDayMonthYearString} from "../../../utils/datetime-utils";
import Image from "../../../commons/image/image";
import CommentItem from "./comment-item/comment-item";
import CommentForm from "./comment-form/comment-form";
import {checkCommentVoteStatus, getCommentsOfPost, voteComment} from "../../../api/comment-api";
import {VOTE_TYPES} from "../../../constants/vote-types";
import AuthenService from '../../../services/authen-service';
import {requireAuthen} from "../../../services/require-authen-service";
import {arrayToDictionary} from "../../../utils/array-to-dictionary";
import {Button, FormGroup} from 'reactstrap';
import {isAllowedWithPermission} from "../../../utils/authentication-permission-check";
import {USER_PERMISSIONS} from "../../../constants/user-permissions";

class ExamView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            comment_count: 0,
            vote_type: VOTE_TYPES.none,
            comment_vote_status: {},
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
            if (AuthenService.getUserInfo()) this._checkCommentVoteStatus(comments.map(comment => comment.id));
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

    async _checkCommentVoteStatus(comment_id_array) {
        requireAuthen(async () => {
            try {
                const {vote_status} = await checkCommentVoteStatus(comment_id_array);
                const comment_vote_status = arrayToDictionary(vote_status, 'comment_id', 'vote_type');
                this.setState({comment_vote_status});
            } catch (err) {
                console.error(err);
                noti('error', err);
            }
        });
    };

    async _voteComment(comment_id, {vote_type}) {
        requireAuthen(async () => {
            try {
                const {comments} = this.state;
                const {vote_infor} = await voteComment(comment_id, {vote_type});
                const {up_vote, down_vote} = vote_infor;
                this.setState({comments: comments.map(comment => (
                    comment.id === comment_id ? {...comment, up_vote, down_vote} : comment
                ))});
                this._checkCommentVoteStatus(comments.map(comment => comment.id));
            } catch (err) {
                console.error(err);
                noti('error', err);
            }
        });
    };

    async _confirmPost() {
        if (this.state.post.is_confirm !== 'true') {
            try {
                const post_id = safeRetrieve(this.props, ['match', 'params', 'exam_id']);
                await confirmPost(post_id, {is_confirm: 'true'});
                this.setState({post: {...this.state.post, is_confirm: 'true'}});
            } catch (err) {
                console.error(err);
                noti('error', err);
            }
        }
    };

    render() {
        const {post, comments, vote_type, comment_vote_status} = this.state;
        const is_confirm =  post.is_confirm === 'true';
        const attachments = post.attachments || [];
        return (
            <MainContent className="exam-view" title={safeRetrieve(post, ['title']) || ''}>
                <FormGroup className="information d-flex align-items-center">
                    <div className="text-secondary mr-3">
                        Đăng bởi&nbsp;
                        <Link to={`/user-profile/${safeRetrieve(post, ['user_id'])}`}>
                            {safeRetrieve(post, ['post_by'])}
                        </Link>&nbsp;-&nbsp;ngày&nbsp;
                        <span className="text-dark">{getDayMonthYearString(safeRetrieve(post, ['create_time']))}</span>
                    </div>
                    {
                        isAllowedWithPermission(USER_PERMISSIONS.confirm_post)
                            ? <Button size="lg" outline={!is_confirm} color="success" onClick={this._confirmPost.bind(this)}>
                                {
                                    is_confirm
                                        ? <span><i className="fa fa-check" /> Đã kiểm duyệt</span>
                                        : 'Kiểm duyệt đề thi này'
                                }
                            </Button>
                            : is_confirm
                                ? <span className="text-success"><i className="fa fa-check-circle"/> Đã kiểm duyệt</span>
                                : null
                    }
                </FormGroup>
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
                        AuthenService.getUserInfo()
                            ? <CommentForm
                                postId={safeRetrieve(this.props, ['match', 'params', 'exam_id'])}
                                onCommentCreated={() => {this._getCommentsOfPost()}}
                            />
                            : null
                    }
                    {
                        comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                voteType={comment_vote_status[comment.id]}
                                onVote={this._voteComment.bind(this)}
                            />
                        ))
                    }
                </div>
            </MainContent>
        );
    }

}

ExamView.propTypes = {};

export default ExamView;