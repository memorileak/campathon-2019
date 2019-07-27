import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {Button, Input, FormGroup, Form} from "reactstrap";

class CommentForm extends Component {

    state = {
        comment: '',
    };

    async _submitComment() {
        const {comment} = this.state;
        console.log(comment);
    };

    render() {
        return (
            <Form className="comment-form">
                <FormGroup className="d-flex align-items-start">
                    <Input
                        type="textarea" className="comment-input" rows={3}
                        placeholder="Để lại một lời bình cho đề thi này"
                        value={this.state.comment}
                        onChange={(e) => {this.setState({comment: e.target.value})}}
                    />
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