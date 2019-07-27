import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {safeRetrieve} from "../../../../utils/retrieve-value-utils";
import Image from "../../../../commons/image/image";
import {getNotificationTimeString} from "../../../../utils/datetime-utils";

class CommentItem extends Component {

    render() {
        const {comment} = this.props;
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
                    <span className="vote text-secondary">
                        <i className="fa fa-thumbs-up" />&nbsp;{safeRetrieve(comment, ['up_vote'])}
                    </span>
                    <span className="vote text-secondary">
                        <i className="fa fa-thumbs-down" />&nbsp;{safeRetrieve(comment, ['down_vote'])}
                    </span>
                </div>
            </div>
        );
    }

}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default CommentItem;