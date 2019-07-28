import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {safeRetrieve} from "../../../../utils/retrieve-value-utils";
import Image from "../../../../commons/image/image";
import {getNotificationTimeString} from "../../../../utils/datetime-utils";
import {VOTE_TYPES} from "../../../../constants/vote-types";

class CommentItem extends Component {

    _handleVote(new_vote_type) {
        const {comment, voteType: current_vote_type} = this.props;
        const vote_type = (current_vote_type === new_vote_type) ? VOTE_TYPES.none : new_vote_type;
        this.props.onVote(comment.id, {vote_type});
    };

    render() {
        const {comment, voteType} = this.props;
        const attachments = comment.attachments || [];
        return (
            <div className="comment-item">
                <h6>
                    {safeRetrieve(comment, ['comment_by'])}
                    <span className="small text-secondary">
                        &nbsp;-&nbsp;{getNotificationTimeString(safeRetrieve(comment, ['create_time']))}
                    </span>
                </h6>
                <div className="comment-content">{safeRetrieve(comment, ['content'])}</div>
                <div className="comment-attachments">
                    {
                        attachments.map(src => (
                            <Image link key={src} src={src} widht="auto" height="10rem" />
                        ))
                    }
                </div>
                <div className="comment-control">
                    <span
                        className={`vote ${voteType === VOTE_TYPES.up ? 'text-primary' : 'text-secondary'}`}
                        onClick={() => {this._handleVote(VOTE_TYPES.up)}}
                    >
                        <i className="fa fa-thumbs-up" />&nbsp;{safeRetrieve(comment, ['up_vote']) || 0}
                    </span>
                    <span
                        className={`vote ${voteType === VOTE_TYPES.down ? 'text-danger' : 'text-secondary'}`}
                        onClick={() => {this._handleVote(VOTE_TYPES.down)}}
                    >
                        <i className="fa fa-thumbs-down" />&nbsp;{safeRetrieve(comment, ['down_vote']) || 0}
                    </span>
                </div>
            </div>
        );
    }

}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    voteType: PropTypes.oneOf([VOTE_TYPES.up, VOTE_TYPES.down, VOTE_TYPES.none, VOTE_TYPES.init]),
    onVote: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
    onVote: () => {},
};

export default CommentItem;