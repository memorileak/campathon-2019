import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, FormGroup, Form} from "reactstrap";
import ImageDropzone from "../../../../commons/image-dropzone/image-dropzone";
import {requireAuthen} from "../../../../services/require-authen-service";
import {noti} from "../../../../services/noti-service";
import LoadingButton from "../../../../commons/loading-button/loading-button";
import {createComment} from "../../../../api/comment-api";
import uuidv4 from 'uuid/v4';

class CommentForm extends Component {

    state = {
        comment: '',
        images: [],
        creating: false,
        dropzone_key: uuidv4(),
    };

    _submitComment() {
        requireAuthen(async () => {
            const {comment: content, images} = this.state;
            if (content || images.length > 0) {
                try {
                    const {postId} = this.props;
                    this.setState({creating: true});
                    await createComment(postId, {content, images});
                    this.setState({comment: '', images: [], dropzone_key: uuidv4()});
                    this.props.onCommentCreated();
                } catch (err) {
                    console.error(err);
                    noti('error', err);
                } finally {
                    this.setState({creating: false});
                }
            } else {
                noti('warning', 'Bình luận phải có ít nhất nội dung hoặc ảnh');
            }
        });
    };

    render() {
        const {comment, creating, dropzone_key} = this.state;
        return (
            <Form className="comment-form">
                <FormGroup>
                    <Input
                        type="textarea" className="comment-input" rows={5}
                        placeholder="Để lại một lời bình cho đề thi này"
                        value={comment}
                        onChange={(e) => {this.setState({comment: e.target.value})}}
                    />
                </FormGroup>
                <FormGroup>
                    <ImageDropzone key={dropzone_key} onDrop={images => {this.setState({images})}} />
                </FormGroup>
                <FormGroup className="d-flex justify-content-end">
                    <LoadingButton
                        loading={creating} type="submit" color="primary"
                        onClick={(e) => {e.preventDefault(); this._submitComment()}}
                    >
                        {creating ? 'Đang đăng...' : 'Đăng bình luận'}
                    </LoadingButton>
                </FormGroup>
            </Form>
        );
    }

}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    onCommentCreated: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
    onCommentCreated: () => {},
};

export default CommentForm;