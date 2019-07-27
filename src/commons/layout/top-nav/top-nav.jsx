import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import AuthenService from "../../../services/authen-service";
import {safeRetrieve} from "../../../utils/retrieve-value-utils";
// import NotificationsMenu from "./notifications-menu/notifications-menu";

class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this._toggle = this._toggle.bind(this);
        this._logOut = this._logOut.bind(this);
    };

    componentDidMount() {
        AuthenService.register('TopNav', this.forceUpdate.bind(this));
    };

    componentWillUnmount() {
        AuthenService.unregister('TopNav');
    };

    _toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    _logOut() {
        AuthenService.logOut();
    };

    render() {
        return (
            <Fragment>
                <Navbar className="top-nav bg-white" light expand="md">
                    <NavbarBrand href="/">
                        Đề thi UET
                    </NavbarBrand>
                    <NavbarToggler onClick={this._toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {/*<NotificationsMenu />
                            <NavItem>
                                <NavLink to="/settings" tag={Link}>
                                    <i className="fa fa-cog" />
                                </NavLink>
                            </NavItem>*/}
                            {
                                AuthenService.getUserInfo()
                                    ? <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            {safeRetrieve(AuthenService.getUserInfo(), ['user', 'full_name'])}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={() => {}}>
                                                Thông tin cá nhân
                                            </DropdownItem>
                                            <DropdownItem onClick={this._logOut}>
                                                Đăng xuất
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    : <Fragment>
                                        <NavItem className="mr-1">
                                            <NavLink to="/login" tag={Link}>
                                                Đăng nhập
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="/register" tag={Link}>
                                                Tạo tài khoản mới
                                            </NavLink>
                                        </NavItem>
                                    </Fragment>
                            }

                        </Nav>
                    </Collapse>
                </Navbar>
            </Fragment>
        );
    };
}

export default withRouter(TopNav);