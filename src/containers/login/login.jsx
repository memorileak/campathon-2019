import React, {Component} from 'react';
import TopNav from "../../commons/layout/top-nav/top-nav";
import Content from "../../commons/layout/content/content";
import Footer from "../../commons/layout/footer/footer";
import {Card, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {userLogIn} from "../../api/authentication-api";
import {noti} from "../../services/noti-service";
import AuthenService from "../../services/authen-service";

class Login extends Component {

    state = {
        user_name: '',
        password: '',
    };

    async _handleSubmit() {
        const {user_name, password} = this.state;
        if (user_name && password) {
            try {
                const {token, user} = await userLogIn({user_name, password});
                AuthenService.setUserInfo({token, user});
            } catch (err) {
                console.error(err);
                noti('error', err);
            }
        } else {
            noti('warning', 'Xin hãy điền đầy đủ thông tin');
        }
    };

    render() {
        const {user_name, password} = this.state;
        return (
            <div className="login d-flex flex-column">
                <TopNav />
                <Content container className="login-container">
                    <Card body>
                        <h2 className="title">Đăng nhập</h2>
                        <Form>
                            <FormGroup>
                                <Label>Tên đăng nhập</Label>
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
                            <div className="d-flex align-items-center justify-content-between">
                                <Link to="/register">Bạn chưa có tài khoản?</Link>
                                <Button
                                    color="primary" type="submit" className="float-right"
                                    onClick={(e) => {e.preventDefault(); this._handleSubmit()}}
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Content>
                <Footer />
            </div>
        );
    }
}

export default Login;