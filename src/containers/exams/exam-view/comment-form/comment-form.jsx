import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {Button, Input, FormGroup, Form} from "reactstrap";
import ImageDropzone from "../../../../commons/image-dropzone/image-dropzone";

class CommentForm extends Component {

    state = {
        comment: '',
        images: [],
    };

    async _submitComment() {
        const {comment} = this.state;
        console.log(comment);
    };

    render() {
        return (
            <Form className="comment-form">
                <FormGroup>
                    <Input
                        type="textarea" className="comment-input" rows={5}
                        placeholder="Để lại một lời bình cho đề thi này"
                        value={this.state.comment}
                        onChange={(e) => {this.setState({comment: e.target.value})}}
                    />
                </FormGroup>
                <FormGroup>
                    <ImageDropzone onDrop={images => {this.setState({images})}} />
                </FormGroup>
                <FormGroup className="d-flex justify-content-end">
                    <Button type="submit" color="primary" onClick={(e) => {e.preventDefault(); this._submitComment()}}>
                        Đăng bình luận
                    </Button>
                </FormGroup>
            </Form>
        );
    }

}

CommentForm.propTypes = {};

export default CommentForm;