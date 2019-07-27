import React, {Component} from 'react';
import TopNav from "../../commons/layout/top-nav/top-nav";
import Content from "../../commons/layout/content/content";
import Footer from "../../commons/layout/footer/footer";
import {Button, Card, Form, FormGroup, Input, Label} from "reactstrap";
import {noti} from "../../services/noti-service";
import {userLogIn, userRegister} from "../../api/authentication-api";
import AuthenService from "../../services/authen-service";

class Register extends Component {

    state = {
        full_name: '',
        email: '',
        user_name: '',
        password: '',
        confirm_password: '',
    };

    async _handleSubmit() {
        const {full_name, email, user_name, password, confirm_password} = this.state;
        if (full_name && email && user_name && password && confirm_password) {
            if (password === confirm_password) {
                try {
                    await userRegister({full_name, email, user_name, password, confirm_password});
                    const {token, user} = await userLogIn({user_name, password});
                    AuthenService.setUserInfo({token, user});
                } catch (err) {
                    console.error(err);
                    noti('error', err);
                }
            } else {
                noti('error', 'Mật khẩu không khớp');
            }
        } else {
            noti('warning', 'Xin hãy điền đầy đủ thông tin');
        }
    };

    render() {
        const {full_name, email, user_name, password, confirm_password} = this.state;
        return (
            <div className="register d-flex flex-column">
                <TopNav />
                <Content container className="register-container">
                    <Card body>
                        <h2 className="title">Đăng ký tài khoản</h2>
                        <Form>
                            <FormGroup>
                                <Label>Họ và tên</Label>
                                <Input
                                    value={full_name}
                                    onChange={(e) => {this.setState({full_name: e.target.value})}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {this.setState({email: e.target.value})}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Tên người dùng</Label>
                                <Input
                                    value={user_name}
                                    onChange={(e) => {this.setState({user_name: e.target.value})}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Mật khẩu</Label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {this.setState({password: e.target.value})}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Gõ lại mật khẩu</Label>
                                <Input
                                    type="password"
                                    value={confirm_password}
                                    onChange={(e) => {this.setState({confirm_password: e.target.value})}}
                                />
                            </FormGroup>
                            <Button
                                color="success" type="submit" className="float-right"
                                onClick={(e) => {e.preventDefault(); this._handleSubmit()}}
                            >
                                Đăng ký
                            </Button>
                        </Form>
                    </Card>
                </Content>
                <Footer />
            </div>
        );
    }

}

export default Register;