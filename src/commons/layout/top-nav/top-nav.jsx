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
import ChangePasswordModal from '../../../containers/dashboard-route/containers/change-password-modal/change-password-modal';
import SellproLogo from '../../../assets/images/logo/sellpro_logo-2.png';
import NotificationsMenu from "./notifications-menu/notifications-menu";

class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isOpenModalChangePassword: false
        };
        this._toggle = this._toggle.bind(this);
        this._logOut = this._logOut.bind(this);
    };

    _toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    _logOut() {
        AuthenService.logOut(true);
    };

    _toggleModal = () => {
        this.setState({
            isOpenModalChangePassword: !this.state.isOpenModalChangePassword
        })
    };

    render() {
        const { isOpenModalChangePassword } = this.state;
        const { routes } = this.props;
        return (
            <Fragment>
                <Navbar className="top-nav" color="light" light expand="md">
                    <NavbarBrand href="/">
                        <img className="app-logo" src={SellproLogo} alt="Sellpro Logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this._toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="d-md-down-none" navbar>
                            {
                                !!routes ?
                                    routes.map(e => (
                                        <NavItem key={e.path}>
                                            <NavLink replace to={e.path} tag={Link}>
                                                {e.name}
                                            </NavLink>
                                        </NavItem>
                                    )) : null
                            }
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NotificationsMenu />
                            <NavItem>
                                <NavLink to="/settings" tag={Link}>
                                    <i className="fa fa-cog" />
                                </NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Wolfgang
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this._toggleModal}>
                                        Change password
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this._logOut}>
                                        Log out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <ChangePasswordModal isOpen={isOpenModalChangePassword} toggle={this._toggleModal} />
            </Fragment>
        );
    };
}

export default withRouter(TopNav);