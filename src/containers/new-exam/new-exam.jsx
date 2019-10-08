import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import TopNav from "../../commons/layout/top-nav/top-nav";
import Content from "../../commons/layout/content/content";
import Footer from "../../commons/layout/footer/footer";
import ImageDropzone from '../../commons/image-dropzone/image-dropzone';
import MainContent from "../../commons/layout/main-content/main-content";
import {Form, FormGroup, Label, Input} from 'reactstrap';
import {noti} from "../../services/noti-service";
import LoadingButton from "../../commons/loading-button/loading-button";
import {createNewPost} from "../../api/post-api";

class NewExam extends Component {

    state = {
        title: '',
        images: [],
        creating: false,
    };

    async _createNewPost() {
        const {title, images} = this.state;
        if (title && images.length > 0) {
            try {
                this.setState({creating: true});
                const {post_id} = await createNewPost({title, images});
                this.props.history.push(`/exams/${post_id}`);
                noti('success', 'Đề thi đã được tải lên thành công');
            } catch (err) {
                console.error(err);
                noti('error', err);
            } finally {
                this.setState({creating: false});
            }
        } else {
            noti('warning', 'Xin hãy điền đầy đủ thông tin');
        }
    };

    render() {
        const {title, creating} = this.state;
        return (
            <div className="new-exam d-flex flex-column">
                <TopNav />
                <Content container className="new-exam-container">
                    <MainContent className="new-exam" title="Đóng góp đề thi">
                        <Form>
                            <FormGroup>
                                <Label>Tiêu đề</Label>
                                <Input
                                    value={title}
                                    onChange={(e) => {this.setState({title: e.target.value})}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Ảnh đính kèm</Label>
                                <ImageDropzone
                                    onDrop={(images) => {this.setState({images})}}
                                />
                            </FormGroup>
                            <LoadingButton
                                type="submit"
                                loading={creating} color="primary" className="float-right"
                                onClick={(e) => {e.preventDefault(); this._createNewPost()}}
                            >
                                {creating ? 'Đang tải lên...' : 'Tải lên'}
                            </LoadingButton>
                        </Form>
                    </MainContent>
                </Content>
                <Footer />
            </div>
        );
    };

}

NewExam.propTypes = {};

export default NewExam;